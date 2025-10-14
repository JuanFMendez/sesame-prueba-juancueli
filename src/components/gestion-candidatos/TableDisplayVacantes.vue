<template>
  <div class="w-full h-full flex flex-col p-4">
    <h1 class="font-bold mb-2">Vacante específica - DEBUG</h1>

    <div class="flex-1 border border-gray-200 rounded-lg overflow-auto">
      <div class="w-full overflow-x-auto">
        <div class="inline-block max-w-full">
          <h2 class="font-semibold mb-2">Vacante cargada:</h2>
          <div class="overflow-auto">
            <pre class="inline-block whitespace-pre-wrap">{{ vacancyOne }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useVacancyStore } from '../../store/vacancyStore'
import { useLoaderStore } from '../../store/loaderStore'
import type { Vacancy } from '../../domain/entities/Vacancy'

export default defineComponent({
  name: 'TableDisplayVacantes',
  props: {
    // temporal, por si luego reactivamos el filtro
    textoFiltro: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup() {
    const vacancyStore = useVacancyStore()
    const loaderStore = useLoaderStore()

    const vacancyOne = ref<Vacancy | null>(null)
    const vacanteIdDefault = import.meta.env.VITE_DEFAULT_VACANCY_ID;


    // Cargar una única vacante
    const fetchOneVacancy = async (vacancyId: string) => {
      await loaderStore.loadWithSpinner(
        (async () => {
          await vacancyStore.fetchVacancyById(vacancyId)
          vacancyOne.value = vacancyStore.vacancyOne
        })()
      )
    }

    // Cargar vacante específica al montar el componente
    onMounted(async () => {
      const vacancyId = vacanteIdDefault;
      await fetchOneVacancy(vacancyId)
    })

    /* 
    // Filtro (comentado por ahora)
    const filteredVacancies = computed(() => {
      const filtro = props.textoFiltro.toLowerCase().trim()
      if (!filtro) return vacanciesAll.value
      return vacanciesAll.value.filter(vacante =>
        vacante.id?.toLowerCase().includes(filtro) ||
        vacante.name?.toLowerCase().includes(filtro) ||
        vacante.description?.toLowerCase().includes(filtro) ||
        vacante.status?.toLowerCase().includes(filtro) ||
        vacante.contractType?.toLowerCase().includes(filtro)
      )
    })
    */

    return { vacancyOne, loaderStore, fetchOneVacancy }
  }
})
</script>
