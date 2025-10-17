<template>

  <!-- titulo principal  -->
  <header class="w-full px-4 py-2 bg-gray-100 flex justify-between items-center">
    
    <!-- titulo de la seccion-->
    <h1 class="text-3xl text-azulOscuro font-bold">
      {{ titulo }}  
    </h1>

    <!-- imagen de perfil en la parte derecha -->
    <img :src="perfilLogo" alt="perfil" class="w-10 h-10 object-contain rounded-full"/>
    
  </header>
  
</template>

<script lang="ts">

  import perfilLogo from '../assets/logo-perfil.png'

  export default {
    name: 'HeaderApp',
      props: {
      titulo: {
        type: String,
        required: true
      }
    },
    setup() {
      return { perfilLogo }
    }
  }

</script>
