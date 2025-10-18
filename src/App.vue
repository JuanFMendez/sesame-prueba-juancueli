<template>
  <div class="min-h-screen flex flex-col">

    <!-- Loader global -->
    <Loader v-if="loaderStore.loading" />
    
    <main class="bg-gray-200 flex-1 flex">
      <router-view class="flex-1" />
    </main>
  </div>
</template>

<script setup lang="ts">

  import { useLoaderStore } from '../src/store/loaderStore'
  import Loader from './components/Loader.vue'

  const loaderStore = useLoaderStore()
  
</script>
