<template>
  <aside class="w-80 bg-white text-gray-800 h-screen p-6">

    <!-- Slot logo -->
    <div class="flex justify-center mb-6 p-6 bg-gray-50 rounded-lg">
      <img :src="logo" alt="Seasme" class="w-48 h-auto object-contain"/>
    </div>

    <!-- Menú principal -->
    <div class="mb-3 text-sm">

      <!-- Administrador -->
      <div class="flex justify-between items-center cursor-pointer mb-1 text-gray-600 select-none" 
        @click="administradorAbierto = !administradorAbierto"
      >
        <!-- titulo y flecha flecha con direccion -->
        <span>ADMINISTRADOR</span>
        <ChevronDown :class="{'rotate-180': administradorAbierto}" class="w-4 h-4 transition-transform duration-200" />

      </div>

      <!-- Submenu de Talento si esta abierto el de administrador -->
      <div v-if="administradorAbierto" class="ml-3 p-4 bg-submenu rounded space-y-1" >

        <!-- Talento -->
        <div class="flex justify-between items-center cursor-pointer text-lila font-normal select-none"
          @click="talentoAbierto = !talentoAbierto"
        >
          <!-- estrella , titulo y flecha con direccion --> 
          <div class="flex items-center"><Star class="w-4 h-4 mr-2" /> <span>Talento</span></div>           
          <ChevronDown :class="{'rotate-180': talentoAbierto}" class="w-4 h-4 transition-transform duration-200" />

        </div>
        
         <!-- Submenu de Reclutamiento si esta abierto el de talento -->
        <div v-if="talentoAbierto" class="cursor-pointer font-bold py-2 pl-4 text-lila select-none"
          :class="reclutamientoSeleccionado ? 'border-l-2 border-lila ml-1' : ''"
          @click="reclutamientoSeleccionado = !reclutamientoSeleccionado"
        >

          <!-- Reclutamiento -->
          <span :class="reclutamientoSeleccionado ? 'font-bold' : 'font-normal'">
            Reclutamiento
          </span>

        </div>

      </div>
      
    </div>

  </aside>

</template>

<script lang="ts">

  import { ref } from 'vue'
  import { ChevronDown, Star } from 'lucide-vue-next'
  import logo from '../assets/logo-sesame.png'

  export default {
    name: 'SidebarMenu',
    components: {
      ChevronDown,
      Star,      
    },
    setup() {

      //por defecto abierto todos los menus
      const administradorAbierto = ref(true)
      const talentoAbierto = ref(true)
      const reclutamientoSeleccionado = ref(true)

      return { administradorAbierto, talentoAbierto, reclutamientoSeleccionado, logo }

    }
  }

</script>
