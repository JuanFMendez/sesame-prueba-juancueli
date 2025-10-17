<template>
  <div class="h-full flex-1 flex flex-col">
    <div class="flex h-full gap-4 w-full">

      <!-- recorremos los distintos estados de candidatos -->
      <div v-for="(status, index) in vacancyCandidateStatuses" :key="status.id"
        class="flex-1 h-full border border-gray-200 rounded-2xl shadow-lg flex flex-col p-4"
      >
        <!-- barra de color según el estado -->
        <div :class="[bgColors[index], 'h-1 w-full rounded-full mb-2']"></div>

        <!-- Icono y nombre del estado -->
        <div class="flex items-center gap-2 mb-2">
          <component :is="icons[index]" class="w-5 h-5" :class="colors[index]" />
          <span class="font-semibold">{{ status.name }}</span>
        </div>

        <!-- contenedor de candidatos filtrados por estado inicialmente y texto de busqueda-->
        <div class="flex-1 bg-white rounded-xl p-2 overflow-y-auto">

          <!-- si existen candidatos mostramos los pertenecientes al estado que toca-->
          <template v-if="filteredCandidates(status.id).length > 0">

            <!-- renderizamos cada candidato filtrado por su estado -->
            <CandidateCard v-for="candidate in filteredCandidates(status.id)" :key="candidate.id" :candidate="candidate" @updated="refreshAllCandidates" class="mt-3" />

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
  import { VacancyService } from '../../domain/services/VacancyService'
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

      //cargamos inicialmente estados y candidatos 
      onMounted(async () => {
        await getCandidateStatuses()
        await getCandidatesByVacancyId()
      })

      return { vacancyCandidateStatuses, icons, colors, bgColors, filteredCandidates, refreshAllCandidates }
    }

  })

</script>
