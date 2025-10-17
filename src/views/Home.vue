<template>
  <div class="flex min-h-screen w-full bg-gray-100 px-26">

    <div class="flex flex-1 h-screen relative">
      
      <div class="absolute top-4 bottom-4 right-0 w-px bg-gray-300/50"></div>
      
      <!-- Menu lateral-->
      <Sidebar class="flex-none h-full w-56" @selectItem="seccionSeleccionada = $event"/>

      <!-- Área principal segun seleccion de aside-->
      <div class="flex-1 flex flex-col h-full mx-6" v-if="seccionSeleccionada === 'Reclutamiento'" >

        <!-- Cabecera -->
        <HeaderApp :titulo="'Reclutamiento'"/>
        
        <!-- Contenedor principal -->
        <div class="flex-1 p-6 bg-white rounded-3xl shadow-md flex flex-col overflow-auto space-y-4 mt-2 mb-6 border border-gray-200">          
          <GestionBoard />
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">

  import Sidebar from '../components/SidebarMenu.vue'
  import HeaderApp from '../components/HeaderApp.vue'
  import GestionBoard from '../components/gestion-candidatos/GestionBoard.vue'

  import { ref } from 'vue'

  export default {
    name: 'Home',
    components: {
      Sidebar,
      HeaderApp,
      GestionBoard
    },
    setup() {

      //valor por defecto porque solo hay una seccion actualmente en el aside
      const seccionSeleccionada = ref('Reclutamiento')
      
      return { seccionSeleccionada }
    }
  }
</script>
