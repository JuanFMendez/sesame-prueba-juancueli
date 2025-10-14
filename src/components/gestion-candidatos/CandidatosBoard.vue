<template>
  <div class="flex flex-col w-full h-full space-y-4">
    
    <!-- Pestañas -->
    <TabsDisplay @seccionSelected="emitSeccionSeleccionada" />

    <!-- Buscador y botón -->
    <div class="flex justify-between items-center mb-4">
      <SearchBar />
      <AddCandidateButton />
    </div>

    <!-- Contenedor de tablas con scroll independiente -->
    <div class="flex-1 border border-gray-200 rounded-lg overflow-auto max-w-full max-h-full">
      <!-- Wrapper interno para scroll horizontal -->
      <div class="inline-block">
        <TableDisplayVacantes
          v-if="activeSection === 'vacantes'"
        />
        <TableDisplayCandidatos
          v-else-if="activeSection === 'candidatos'"
        />
      </div>
    </div>

  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import TabsDisplay from './TabsDisplay.vue'
import SearchBar from './SearchBar.vue'
import AddCandidateButton from './AddCandidateButton.vue'
import TableDisplayVacantes from './TableDisplayVacantes.vue'
import TableDisplayCandidatos from './TableDisplayCandidatos.vue'

export default defineComponent({
  name: 'CandidatosBoard',
  components: {
    TabsDisplay,
    SearchBar,
    AddCandidateButton,
    TableDisplayVacantes,
    TableDisplayCandidatos
  },
  setup() {
    const activeSection = ref('vacantes')

    const emitSeccionSeleccionada = (section: string) => {
      activeSection.value = section
    }

    return { activeSection, emitSeccionSeleccionada }
  }
})
</script>
