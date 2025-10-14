<template>
  <div class="relative w-56">

    <!-- lupa con libreria lucide -->
    <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
      <Search class="w-4 h-4 text-gray-400" />
    </span>

    <input type="text" placeholder="Buscar" class="input-buscar pl-10 pr-3 py-1.5 text-sm w-full rounded-xl border focus:outline-none focus:ring-0"/>
    
  </div>
</template>


<script lang="ts">

  import { Search } from 'lucide-vue-next'
  
  export default {
    name: 'SearchBar',
    components: {
      Search
    }
  }

</script>
