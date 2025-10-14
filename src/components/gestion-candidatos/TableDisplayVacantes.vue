<template>
  <div class="w-full h-full flex flex-col p-4">
    <h1 class="font-bold mb-2">Tabla Vacantes - DEBUG</h1>

    <!-- Loader global -->
    <div v-if="loaderStore.loading" class="mb-4 p-4 text-center bg-gray-100 rounded">
      Cargando vacantes...
    </div>

    <!-- opcion de recarga de vacantes -->
    <!--
    <div class="mb-4">
      <button @click="reloadAllVacancies" class="px-4 py-2 bg-blue-500 text-white rounded">
        Recargar vacantes
      </button>
    </div>
    -->

    <div class="flex-1 border border-gray-200 rounded-lg overflow-auto">
      <div class="w-full overflow-x-auto">
        <div class="inline-block max-w-full">

          <h2 class="font-semibold mb-2">Todas las vacantes:</h2>
          <div class="overflow-auto">
            <pre class="inline-block whitespace-pre-wrap">{{ vacanciesAll }}</pre>
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
import { defineComponent, ref, onMounted } from 'vue'
import { useVacancyStore } from '../../store/vacancyStore'
import { useLoaderStore } from '../../store/loaderStore'
import type { Vacancy } from '../../domain/entities/Vacancy';

export default defineComponent({
  name: 'TableDisplayVacantes',
  setup() {

    const vacancyStore = useVacancyStore()
    const loaderStore = useLoaderStore()

    const vacanciesAll = ref<Vacancy[]>([])
    const vacancyOne = ref<Vacancy | null>(null)

    // Cargar todas las vacantes
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

    // Cargar todas las vacantes al montar el componente
    onMounted(fetchAllVacancies)

    return {
      vacanciesAll,
      vacancyOne,
      fetchOneVacance,
      reloadAllVacancies,
      loaderStore
    }
  }

})
</script>
