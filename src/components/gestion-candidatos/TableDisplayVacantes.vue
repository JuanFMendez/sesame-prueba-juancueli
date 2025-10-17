<template>
  <div class="h-full flex-1 flex flex-col">
    <div class="flex h-full gap-4 w-full">

      <!-- recorremos los distintos estados de candidatos -->
      <!-- v2, permitimos que los estados sea dropeables, recuperamos el estado donde se suelta el candidato -->
      <div v-for="(status, index) in vacancyCandidateStatuses" :key="status.id"
        class="flex-1 h-full border border-gray-200 rounded-2xl shadow-lg flex flex-col p-4"
        @dragover.prevent @drop="soltarCandidato($event, status.id)"  
      >
        <!-- barra de color según el estado -->
        <div :class="[bgColors[index], 'h-1 w-full rounded-full mb-2']"></div>

        <!-- icono y nombre del estado -->
        <div class="flex items-center gap-2 mb-2">
          <component :is="icons[index]" class="w-5 h-5" :class="colors[index]" />
          <span class="font-semibold">{{ status.name }}</span>
        </div>

        <!-- contenedor de candidatos filtrados por estado inicialmente y texto de busqueda-->
        <div class="flex-1 bg-white rounded-xl p-2 overflow-y-auto">

          <!-- si existen candidatos mostramos los pertenecientes al estado que toca-->
          <template v-if="filteredCandidates(status.id).length > 0">

            <!-- renderizamos cada candidato filtrado por su estado -->
            <!-- v2, permitimos que sea dragable , recuperamos el candidato arrastrado-->
            <CandidateCard v-for="candidate in filteredCandidates(status.id)" :key="candidate.id" :candidate="candidate" 
              @updated="refreshAllCandidates" class="mt-3"
              draggable="true" @dragstart="arrastrarCandidato($event, candidate)"  
            />

          </template>

          <!-- mostramos mensaje de no existen candidatos en estado-->
          <template v-else>
            <div class="text-gray-400 text-sm text-center mt-4">
              No hay candidatos en este estado
            </div>
          </template>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

  import { defineComponent, ref, onMounted, computed } from 'vue'
  import CandidateCard from '../CandidateCard.vue'
  import { useCandidateStore } from '../../store/candidateStore'
  import { useLoaderStore } from '../../store/loaderStore'
  import { VacancyService } from '../../infra/services/VacancyService'
  import type { CandidateStatus } from '../../domain/entities/CandidateStatus'
  import type { Candidate } from '../../domain/entities/Candidate'
  import { Archive, User, PartyPopper, Ban } from 'lucide-vue-next'

  export default defineComponent({
    name: 'TableDisplayVacantes',
    emits: ['updated'],
    props: {
      // recibe un texto de filtro desde el componente padre
      textoFiltro: { type: String, default: '' }
    },
    components: {  CandidateCard, Archive, User, PartyPopper, Ban },
    setup(props, { emit }) {

      const loaderStore = useLoaderStore()
      const vacancyService = new VacancyService()
      const candidateStore = useCandidateStore()
      const vacanteIdDefault = import.meta.env.VITE_DEFAULT_VACANCY_ID

      // estados de candidatos de la vacante
      const vacancyCandidateStatuses = ref<CandidateStatus[]>([])

      // lista completa de candidatos de la vacante
      const candidates = ref<Candidate[]>([])

      // iconos y colores de cada estado
      const icons = [Archive, User, PartyPopper, Ban]
      const colors = ['text-green-500', 'text-teal-400', 'text-blue-500', 'text-red-500']
      const bgColors = ['bg-green-500', 'bg-teal-400', 'bg-blue-500', 'bg-red-500']

      // funcion para recuperar los estados de candidatos
      const getCandidateStatuses = async () => {
        await loaderStore.loadWithSpinner((async () => {
          try {
            vacancyCandidateStatuses.value = await vacancyService.getCandidateStatuses(vacanteIdDefault)
          } catch (error) {
            console.error(error)
          }
        })())
      }

      // funcion para recuperar los candidatos de la vacante
      const getCandidatesByVacancyId = async () => {
        await loaderStore.loadWithSpinner((async () => {
          try {
            await candidateStore.getCandidatesByVacancyId(vacanteIdDefault)
            candidates.value = candidateStore.candidatesAll
          } catch (error) {
            console.error(error)
          }
        })())
      }

      // funcion para refrescar toda la lista y emitir un evento al padre de actualizado
      const refreshAllCandidates = async () => {
        await getCandidatesByVacancyId()
        emit('updated', true)
      }

      // primer filtro de la busqueda de texto
      const candidatesFilteredByText = computed(() => {

        //si no hay nada escrito en el filtro de busqueda devolvemos todos los candidatos
        if (!props.textoFiltro) {
          return candidates.value
        }

        const filtro = props.textoFiltro.toLowerCase().trim()

        //candidatos filtrado por posibles valores
        return candidates.value.filter(c =>
          c.firstName.toLowerCase().includes(filtro) ||
          c.lastName.toLowerCase().includes(filtro) ||
          c.email.toLowerCase().includes(filtro) ||
          c.status?.name.toLowerCase().includes(filtro)
        )
      })

      /**
       * candidatesFilteredByText ya tiene filtrados los candidatos por busqueda de texto
       * con filteredcandidates filtramos por estados 
       */
      const filteredCandidates = (statusId: string) => {
        return candidatesFilteredByText.value.filter(c => c.statusId === statusId)
      }


      /**
       * --------------------------
       * DRAG & DROP
       * --------------------------
       */

        //candidato que se seleccionara a mover
        const dragCandidate = ref<Candidate | null>(null)

        // al mover el candidato se dispara arrastrarCandidato
        const arrastrarCandidato = (event: DragEvent, candidate: Candidate) => {
          dragCandidate.value = candidate
          //efecto permitido de mover 
          event.dataTransfer!.effectAllowed = 'move'
        }

        // se dispara al soltar sobre una columna de estado
        const soltarCandidato = async (event: DragEvent, newStatusId: string) => {
          
          //IMPORTATE , permite realizar el drop
          event.preventDefault()

          //control de null
          if (!dragCandidate.value){
            return
          } 

          if(dragCandidate.value.statusId === newStatusId){
            console.debug("Candidato arrastrado a su mismo estado, no realizamos operacion")
            return 
          }

          //generamos una copa del candidato con todos sus datos y el status modificado
          const candidateModificado = { ...dragCandidate.value, statusId: newStatusId };

          await loaderStore.loadWithSpinner((async () => {
            //actualizamos candidato
            await candidateStore.updateCandidate(dragCandidate.value!.id, candidateModificado )
            //recuperamos toda la lista
            await refreshAllCandidates()
            //limpiamos candidato arrastrado
            dragCandidate.value = null
          })())
          
        } 

      /**
       * --------------------------
       * DRAG & DROP
       * --------------------------
       */

      //cargamos inicialmente estados y candidatos 
      onMounted(async () => {
        await getCandidateStatuses()
        await getCandidatesByVacancyId()
      })

      return { 
        vacancyCandidateStatuses, icons, colors, bgColors, filteredCandidates, refreshAllCandidates, arrastrarCandidato, soltarCandidato
      }
    }

  })

</script>
