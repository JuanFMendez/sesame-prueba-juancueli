<template>
  tabla vacantes , DEBUG
</template>

<script lang="ts">

  import { defineComponent, onMounted } from 'vue'
  import { VacancyService } from '../domain/services/VacancyService'

  export default defineComponent({
    name: 'TableDisplayVacantes',
    setup() {
      const serviceVacancies = new VacancyService()
      
      onMounted(async () => {
        try {

          //TODO : BORRAR TEST DE PETICION CONJUNTA
          const vacancies = await serviceVacancies.getAllVacancies()
          console.debug('Vacancies TODAS:', vacancies)

          //TODO : BORRAR TEST DE PETICION UNICA
          const vacancyId = '4fe9037e-e1ee-497f-94c3-fabf50475dfa'
          const vacancy = await serviceVacancies.getVacancyById(vacancyId)

          console.debug('Vacancy UNICA:', vacancy)

        } catch (error) {
          console.error('Error al obtener datos:', error)
        }
      })
    }
  })

</script>
