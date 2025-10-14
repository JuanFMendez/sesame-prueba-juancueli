<template>
  <div class="min-h-screen flex flex-col">

    <!-- Loader global -->
    <Loader v-if="loaderStore.loading" />
    
    <main class="bg-gray-200 flex-1 flex">
      <router-view class="flex-1" />
    </main>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useLoaderStore } from '../src/store/loaderStore'
  import Loader from './components/Loader.vue'

  export default defineComponent({

    components: { Loader },
    setup() {
      const loaderStore = useLoaderStore()
      return { loaderStore }
    }

  })
</script>
