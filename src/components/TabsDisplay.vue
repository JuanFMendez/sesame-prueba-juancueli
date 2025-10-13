<template>

  <div class="relative border-b border-gray-300 mb-4">

    <div class="flex space-x-4">

      <!-- pestania vacantes -->
      <button
        class="px-4 py-2 -mb-px"
        :class="[ 'border-b-2 px-4 py-2', activeTab === 'vacantes' ? 'text-lila font-bold' : 'border-transparent text-gray-300 font-normal opacity-50']"
        @click="activeTab = 'vacantes'"
      >
        Vacantes
      </button>

      <!-- pestania candidatos -->
      <button
        class="px-4 py-2 -mb-px"
        :class="['border-b-2 px-4 py-2', activeTab === 'candidatos' ? 'text-lila font-bold': 'border-transparent text-gray-300 font-normal opacity-50']"
        @click="activeTab = 'candidatos'"
      >
        Candidatos
      </button>
    </div>

  </div>

</template>

<script lang="ts">

  import { ref } from 'vue'

  export default {
    name: 'TabsDisplay',
    setup() {
      const activeTab = ref('vacantes')
      return { activeTab }
    }
  }

</script>
