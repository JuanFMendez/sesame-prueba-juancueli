<template>
  <div class="flex flex-col w-full h-full space-y-4">
    
    <!-- Pestañas -->
    <TabsDisplay @seccionSelected="emitSeccionSeleccionada" />

    <!-- Buscador y botón -->
    <div class="flex justify-between items-center mb-4">
      <SearchBar :seccionActiva="activeSection" @search="emitBusqueda" />
      <AddCandidateButton />
    </div>

    <!-- TODO : PENDIENTE CORREGIR Contenedor de tablas con scroll independiente -->    
    <div class="flex-1 border border-gray-200 rounded-lg overflow-auto max-w-full max-h-full">

      <div class="inline-block">
        <TableDisplayVacantes v-if="activeSection === 'vacantes'" :textoFiltro="searchText"/>
        <TableDisplayCandidatos v-else-if="activeSection === 'candidatos'" :textoFiltro="searchText"/>
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
    const searchText = ref('')

    //seccion seleccionada en componente hijo TabsDisplay
    const emitSeccionSeleccionada = (section: string) => {
      activeSection.value = section
    }

    //texto buscado en componente hijo SearchBar
    const emitBusqueda = (text: string) => {
      searchText.value = text
    }

    return { activeSection, emitSeccionSeleccionada, searchText ,emitBusqueda }
  }
})
</script>
