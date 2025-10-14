<template>
  <div class="p-4 w-full">
    <h1 class="font-bold mb-2">Tabla Candidatos - DEBUG</h1>

    <div class="mb-4 overflow-auto">
      <pre class="inline-block">        
        {{ JSON.stringify(candidates, null, 2) }}
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { CandidateService } from '../../domain/services/CandidateService'

  export default defineComponent({
    name: 'TableDisplayCandidatos',
    setup() {
      const serviceCandidate = new CandidateService()

      // Variable reactiva para mostrar en el template
      const candidates = ref<any[]>([])

      onMounted(async () => {
        try {

          //TODO : BORRAR TEST DE PETICION UNICA
          const vacancyId = '4fe9037e-e1ee-497f-94c3-fabf50475dfa'
          const candidatos = await serviceCandidate.getCandidatesByVacancyId(vacancyId)
          console.debug('candidatos :', candidatos)
          candidates.value = candidatos

        } catch (error) {
          console.error('Error al obtener datos:', error)
        }
      })

      return { candidates }
    }
  })
</script>
