<template>
  <div class="p-1">
    <div class="overflow-x-auto bg-white rounded-xl shadow p-4">

      <!-- Tabla de candidatos -->
      <table class="min-w-full table-auto border-collapse rounded-t-xl overflow-hidden">
        
        <thead class="bg-gray-200">

          <tr class="select-none">
            <th class="px-4 py-3 text-center text-lg text-lila font-bold font-especifico">Nombre</th>
            <th class="px-4 py-3 text-center text-lg text-lila font-bold font-especifico">Apellido</th>
            <th class="px-4 py-3 text-center text-lg text-lila font-bold font-especifico">Email</th>
            <th class="px-4 py-3 text-center text-lg text-lila font-bold font-especifico">Estado</th>
            <th class="px-4 py-3 text-right text-lg text-lila font-bold w-36"></th>
          </tr>

        </thead>
        <tbody>

          <tr v-for="candidato in candidatosFiltradosByBusqueda" :key="candidato.id"
            class="hover:bg-gray-150 text-center cursor-pointer border-b border-gray-100 odd:bg-gray-150 even:bg-gray-50"
            @dblclick="openEditarCandidato(candidato)"
          >
            <td class="px-4 py-3">{{ candidato.firstName }}</td>
            <td class="px-4 py-3">{{ candidato.lastName }}</td>
            <td class="px-4 py-3">{{ candidato.email }}</td>
            <td class="px-4 py-3">
              <span :class="candidato.status?.name === 'Seleccionado' ? 'text-green-600 font-semibold' : ''">
                {{ candidato.status?.name }}
              </span>
            </td>
            <td class="px-4 py-3 w-36">
              <div class="flex justify-end gap-2">
                <button @click="openEditarCandidato(candidato)" class="font-especifico-ligth btn-azulOscuro text-sm font-normal px-4 py-1.5 rounded-xl shadow-sm">
                  Editar
                </button>                
              </div>              
            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <!-- Modal de edición -->
    <CandidateModal v-if="showCandidateModal" :candidateData="candidateToEdit" @close="showCandidateModal = false" @updated="refreshCandidates" />

  </div>
</template>


<script lang="ts">

  import { defineComponent, ref, onMounted, computed } from 'vue'
  import { useCandidateStore } from '../../store/candidateStore'
  import CandidateModal from './addCandidate/CandidateModal.vue'
  import type { Candidate } from '../../domain/entities/Candidate'
  import { useLoaderStore } from '../../store/loaderStore'

  export default defineComponent({
    components: { CandidateModal },
    props: {
      textoFiltro: { type: String, default: '' }
    },
    emits: ['updated'],
    setup(props, { emit }) {

      const candidateStore = useCandidateStore()
      const loaderStore = useLoaderStore()
      const candidates = ref<Candidate[]>([])
      const showCandidateModal = ref(false)
      const candidateToEdit = ref<Candidate | undefined>(undefined)

      // recuperamos candidatos de una vacante
      const getCandidatesByVacancyId = async () => {
        await loaderStore.loadWithSpinner((async () => {
          await candidateStore.getCandidatesByVacancyId(import.meta.env.VITE_DEFAULT_VACANCY_ID)
          candidates.value = candidateStore.candidatesAll
        })())
      }

      // refresco lista y emit
      const refreshCandidates = async () => {
        await getCandidatesByVacancyId()
        emit('updated', true)
        showCandidateModal.value = false
      }

      //cargamos candidatos de la vacante
      onMounted(async () => { 
        await getCandidatesByVacancyId() 
      })

      // filtrado por busqueda 
      const candidatosFiltradosByBusqueda = computed(() => {

        if (!props.textoFiltro){
          return candidates.value
        } 

        const filtro = props.textoFiltro.toLowerCase().trim()

        return candidates.value.filter(c =>
          c.firstName.toLowerCase().includes(filtro) ||
          c.lastName.toLowerCase().includes(filtro) ||
          c.email.toLowerCase().includes(filtro) ||
          c.status?.name.toLowerCase().includes(filtro)
        )
      })

      // seleccionamos el candidato que se quiere mostrar y abrimos modal
      const openEditarCandidato = (candidato: Candidate) => {
        candidateToEdit.value = candidato
        showCandidateModal.value = true
      }

      return { candidates, candidatosFiltradosByBusqueda, showCandidateModal, candidateToEdit, openEditarCandidato, refreshCandidates }
    },
  })

</script>
