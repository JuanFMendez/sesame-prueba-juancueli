<template>
  <div class="p-4 w-full h-full flex flex-col">
    <h1 class="font-bold mb-2">Tabla Candidatos - DEBUG</h1>

    <div class="flex-1 border border-gray-200 rounded-lg overflow-auto">
      <div class="w-full overflow-x-auto">
        <div class="inline-block max-w-full">
          <h2 class="font-semibold mb-2">Candidatos:</h2>
          <div class="overflow-auto">
            <pre class="inline-block whitespace-pre-wrap">{{ filteredCandidates }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

  import { defineComponent, ref, onMounted, computed } from 'vue'
  import { useCandidateStore } from '../../store/candidateStore'
  import { useLoaderStore } from '../../store/loaderStore'

  export default defineComponent({
    name: 'TableDisplayCandidatos',
    props: {
      textoFiltro: {
        type: String,
        required: false,
        default: ''
      }
    },
    setup(props) {

      const candidateStore = useCandidateStore()
      const loaderStore = useLoaderStore()
      const candidates = ref<any[]>([])

      // Cargar todos los candidatos
      const fetchAllCandidates = async () => {
        await loaderStore.loadWithSpinner(
          (async () => {
            const vacanteId = "4fe9037e-e1ee-497f-94c3-fabf50475dfa";
            await candidateStore.fetchCandidatesByVacancyId(vacanteId)
            candidates.value = candidateStore.candidatesAll
          })()
        )
      }

      // Filtro de candidatos
      const filteredCandidates = computed(() => {
        const filtro = props.textoFiltro.toLowerCase().trim()
        if (!filtro) return candidates.value

        return candidates.value.filter(candidato =>
          (candidato.id?.toLowerCase().includes(filtro)) ||
          (candidato.name?.toLowerCase().includes(filtro)) ||
          (candidato.email?.toLowerCase().includes(filtro)) ||
          (candidato.status?.toLowerCase().includes(filtro)) ||
          (candidato.vacancyTitle?.toLowerCase().includes(filtro))
        )
      })

      // Cargar al montar
      onMounted(fetchAllCandidates)

      return { candidates, filteredCandidates, loaderStore, fetchAllCandidates }
    }
  })
</script>
