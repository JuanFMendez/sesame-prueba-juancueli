<template>
  <header class="w-full px-4 py-2 bg-gray-100 flex justify-between items-center">
    
    <h1 class="text-3xl text-azulOscuro font-bold font-especifico">{{ titulo }}</h1>

    <div class="flex items-center space-x-2">
      <LanguageSelect />    
      <img :src="perfilLogo" alt="perfil" class="w-8 h-8 object-contain rounded-full self-center"/>    
    </div>

  </header>
</template>


<script setup lang="ts">
  import perfilLogo from '../assets/logo-perfil.png'
  import LanguageSelect from '../components/LanguageSelect.vue'

  const props = defineProps<{ titulo: string }>()
</script>
