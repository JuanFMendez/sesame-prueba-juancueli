<template>
  <div class="w-full h-full flex flex-col p-4">
    <h1 class="font-bold mb-2">Tabla Vacantes - DEBUG</h1>

    <div class="flex-1 border border-gray-200 rounded-lg overflow-auto">
      
      <div class="w-full overflow-x-auto">
        
        <div class="inline-block max-w-full">
          
          <h2 class="font-semibold mb-2">Todas las vacantes:</h2>
          <div class="overflow-auto">
            <pre class="inline-block whitespace-pre-wrap">
              {{ JSON.stringify(vacanciesAll, null, 2) }}
            </pre>
          </div>

          <h2 class="font-semibold mt-4 mb-2">Vacante específica:</h2>
          <div class="overflow-auto">
            <pre class="inline-block whitespace-pre-wrap">
              {{ JSON.stringify(vacancyOne, null, 2) }}
            </pre>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { VacancyService } from '../../domain/services/VacancyService'

export default defineComponent({
  name: 'TableDisplayVacantes',
  setup() {
    const serviceVacancies = new VacancyService()

    // Variables reactivas para mostrar en el template
    const vacanciesAll = ref<any[]>([])
    const vacancyOne = ref<any>(null)
    
    onMounted(async () => {
      try {
        //TODO : BORRAR TEST DE PETICION CONJUNTA
        const vacancies = await serviceVacancies.getAllVacancies()
        console.debug('Vacancies TODAS:', vacancies)
        vacanciesAll.value = vacancies

        //TODO : BORRAR TEST DE PETICION UNICA
        const vacancyId = '4fe9037e-e1ee-497f-94c3-fabf50475dfa'
        const vacancy = await serviceVacancies.getVacancyById(vacancyId)
        console.debug('Vacancy UNICA:', vacancy)
        vacancyOne.value = vacancy

      } catch (error) {
        console.error('Error al obtener datos:', error)
      }
    })

    return { vacanciesAll, vacancyOne }
  }
})
</script>
