<template>
  <div class="flex min-h-screen w-full bg-gray-100 px-26">

    <div class="flex flex-1 h-screen relative">
      
      <div class="absolute top-4 bottom-4 right-0 w-px bg-gray-300/50"></div>
      
      <!-- Menu lateral-->
      <Sidebar class="flex-none h-full w-56" />

      <!-- Área principal-->
      <div class="flex-1 flex flex-col h-full mx-6">
        
        <!-- Cabecera -->
        <HeaderApp />

        <!-- Contenedor principal -->
        <div class="flex-1 p-6 bg-white rounded-3xl shadow-md flex flex-col overflow-auto space-y-4 mt-2 mb-6 border border-gray-200">
          
          <!-- Pestañas -->
          <TabsDisplay />

          <!-- Buscador y botón -->
          <div class="flex justify-between items-center">
            <SearchBar />
            <AddCandidateButton />
          </div>

          <!-- Tabla -->
          <TableDisplayVacantes />
          <TableDisplayCandidatos />


        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import Sidebar from '../components/SidebarMenu.vue'
import HeaderApp from '../components/HeaderApp.vue'
import TabsDisplay from '../components/TabsDisplay.vue'
import TableDisplayVacantes from '../components/TableDisplayVacantes.vue'
import TableDisplayCandidatos from '../components/TableDisplayCandidatos.vue'
import SearchBar from '../components/SearchBar.vue'
import AddCandidateButton from '../components/AddCandidateButton.vue'

export default {
  name: 'Home',
  components: {
    Sidebar,
    HeaderApp,
    TabsDisplay,
    TableDisplayVacantes,
    TableDisplayCandidatos,
    SearchBar,
    AddCandidateButton
  }
}
</script>
