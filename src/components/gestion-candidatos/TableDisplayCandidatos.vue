<template>
  <div class="p-4">
    <div class="overflow-x-auto bg-white rounded-xl shadow p-4">

      <table class="min-w-full table-auto border-collapse rounded-t-xl overflow-hidden">

        <thead class="bg-gray-200">
          <tr class="select-none">
            <th class="px-4 py-3 text-center text-lg text-lila font-bold">Nombre</th>
            <th class="px-4 py-3 text-center text-lg text-lila font-bold">Apellido</th>
            <th class="px-4 py-3 text-center text-lg text-lila font-bold">Email</th>
            <th class="px-4 py-3 text-center text-lg text-lila font-bold">Estado</th>
            <th class="px-4 py-3 text-center text-lg text-lila font-bold w-36">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="candidato in candidates" :key="candidato.id" 
            class="hover:bg-gray-150 text-center cursor-pointer border-b border-gray-100 odd:bg-gray-150 even:bg-gray-50"
            @dblclick="openEditarCandidato(candidato)"
          >
            <td class="px-4 py-3">{{ candidato.firstName }}</td>
            <td class="px-4 py-3">{{ candidato.lastName }}</td>
            <td class="px-4 py-3">{{ candidato.email }}</td>
            <td class="px-4 py-3">{{ candidato.status?.name }}</td>
            <td class="px-4 py-3 w-36">
              <div class="flex justify-end gap-2">
                <button @click="openEditarCandidato(candidato)" class="btn-azulOscuro text-sm font-normal px-4 py-1.5 rounded-xl shadow-sm">
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

  import { defineComponent, ref, onMounted } from 'vue'
  import { useCandidateStore } from '../../store/candidateStore'
  import CandidateModal from './addCandidate/CandidateModal.vue'
  import type { Candidate } from '../../domain/entities/Candidate'
  import { ArrowUpDownIcon } from 'lucide-vue-next'

  export default defineComponent({
    components: { CandidateModal, ArrowUpDownIcon },
    setup(props, { emit }) {
      
      const candidateStore = useCandidateStore()

      const candidates = ref<Candidate[]>([])
      const showCandidateModal = ref(false)
      const candidateToEdit = ref<Candidate | undefined>(undefined)

      // recuperamos candidatos de una vacante
      const getCandidatesByVacancyId = async () => {
        await candidateStore.getCandidatesByVacancyId(import.meta.env.VITE_DEFAULT_VACANCY_ID)
        candidates.value = candidateStore.candidatesAll
      }

      //abrimos modal con el candidato incluido
      const openEditarCandidato = (candidato: Candidate) => {
        candidateToEdit.value = candidato
        showCandidateModal.value = true
      }

      //accion para controlar que se actualizo un candidato y hay que refrescar la lista
      //mandamos emit al padre para que sepa que hay que mostrar alerta de update
      const refreshCandidates = async () => {
        await getCandidatesByVacancyId()
        emit('updated', true)
        showCandidateModal.value = false
      }

      //recuperamos candidatos de vacante 
      onMounted(async () => {
        await getCandidatesByVacancyId()
      })

      return {
        candidates, showCandidateModal, candidateToEdit, openEditarCandidato, refreshCandidates
      }
    },
  })

</script>
