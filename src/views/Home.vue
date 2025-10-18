<template>
  <div class="flex min-h-screen w-full bg-gray-100 pl-10">
    <div class="flex flex-1 h-screen relative">
            
      <!-- Menu lateral-->
      <Sidebar class="flex-none h-full w-56" @selectItem="seccionSeleccionada = $event"/>

      <!-- Área principal según selección de aside-->
      <div class="flex-1 flex flex-col h-full ml-8 border-r-1 pr-6 border-gray-200" 
           v-if="seccionSeleccionada === 'sidebar.recruitment'" >
        <!-- Cabecera -->
        <HeaderApp :titulo="t(seccionSeleccionada)"/>
        
        <!-- Contenedor principal -->
        <div class="flex-1 p-6 bg-white rounded-3xl shadow-md flex flex-col overflow-auto space-y-4 mt-2 mb-6 border border-gray-200">          
          <GestionBoard />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import Sidebar from '../components/SidebarMenu.vue'
import HeaderApp from '../components/HeaderApp.vue'
import GestionBoard from '../components/gestion-candidatos/GestionBoard.vue'

const { t } = useI18n()

// valor por defecto porque solo hay una sección actualmente en el aside
// guardamos la clave, no la traducción
const seccionSeleccionada = ref('sidebar.recruitment')
</script>
