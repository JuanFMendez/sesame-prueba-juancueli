<template>
  tabla candidatos , DEBUG
</template>

<script lang="ts">

  import { defineComponent, onMounted } from 'vue'
  import { CandidateService } from '../domain/services/CandidateService'

  export default defineComponent({
    name: 'TableDisplayCandidatos',
    setup() {
      const serviceCandidate = new CandidateService()

      onMounted(async () => {
        try {

          //TODO : BORRAR TEST DE PETICION UNICA
          const vacancyId = '4fe9037e-e1ee-497f-94c3-fabf50475dfa'
          const candidatos = await serviceCandidate.getCandidatesByVacancyId(vacancyId)

          console.debug('candidatos :', candidatos)

        } catch (error) {
          console.error('Error al obtener datos:', error)
        }
      })
    }
  })

</script>
