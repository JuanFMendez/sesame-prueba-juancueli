<template>
  <div class="w-full h-full flex flex-col p-4">
    <h1 class="font-bold mb-2">Tabla Vacantes - DEBUG</h1>

    <div class="flex-1 border border-gray-200 rounded-lg overflow-auto">
      <div class="w-full overflow-x-auto">
        <div class="inline-block max-w-full">
          
          <h2 class="font-semibold mb-2">Todas las vacantes:</h2>
          <div class="overflow-auto">
            <pre class="inline-block whitespace-pre-wrap">{{ filteredVacancies }}</pre>
          </div>

          <h2 class="font-semibold mt-4 mb-2">Vacante específica:</h2>
          <div class="overflow-auto">
            <pre class="inline-block whitespace-pre-wrap">{{ vacancyOne }}</pre>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue'
  import { useVacancyStore } from '../../store/vacancyStore'
  import { useLoaderStore } from '../../store/loaderStore'
  import type { Vacancy } from '../../domain/entities/Vacancy'

  export default defineComponent({
    name: 'TableDisplayVacantes',
    props: {
      textoFiltro: {
        type: String,
        required: false,
        default: ''
      }
    },
    setup(props) {

      const vacancyStore = useVacancyStore()
      const loaderStore = useLoaderStore()

      const vacanciesAll = ref<Vacancy[]>([])
      const vacancyOne = ref<Vacancy | null>(null)

      // cargar todas las vacantes
      const fetchAllVacancies = async () => {
        await loaderStore.loadWithSpinner(
          (async () => {
            await vacancyStore.fetchAllVacancies()
            vacanciesAll.value = vacancyStore.vacanciesAll
          })()
        )
      }

      // Forzar recarga de todas las vacantes
      const reloadAllVacancies = async () => {
        await loaderStore.loadWithSpinner(
          (async () => {
            await vacancyStore.forceReloadAll()
            vacanciesAll.value = vacancyStore.vacanciesAll
          })()
        )
      }

      // Abrir una única vacante
      const fetchOneVacance = async (vacancyId: string) => {
        await loaderStore.loadWithSpinner(
          (async () => {
            await vacancyStore.fetchVacancyById(vacancyId)
            vacancyOne.value = vacancyStore.vacancyOne
          })()
        )
      }

      //filtro de vacantes
      const filteredVacancies = computed(() => {

        //filtro escrito en la busqueda
        const filtro = props.textoFiltro.toLowerCase().trim()

        //si no hay filtro, devolvemos todas las vacantes
        if (!filtro) {
          return vacanciesAll.value
        } else{

          return vacanciesAll.value.filter(vacante => {
            return (
              vacante.id?.toLowerCase().includes(filtro) ||
              vacante.name?.toLowerCase().includes(filtro) ||
              vacante.description?.toLowerCase().includes(filtro) ||
              vacante.status?.toLowerCase().includes(filtro) ||
              vacante.contractType?.toLowerCase().includes(filtro)
            )
          })
        }
      })

      // Cargar todas las vacantes al montar el componente
      onMounted(fetchAllVacancies)

      return { vacanciesAll, vacancyOne,loaderStore, filteredVacancies, fetchOneVacance,reloadAllVacancies }

    }
  })
</script>
