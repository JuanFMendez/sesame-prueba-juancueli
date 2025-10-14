<template>
  <div v-if="visible" role="alert" :class="['border px-4 py-3 rounded m-4 flex justify-between items-center',
      tipo === 'success'
        ? 'bg-green-100 border-green-400 text-green-700'
        : 'bg-red-100 border-red-400 text-red-700'
    ]">
    <span class="block sm:inline">{{ message }}</span>
    <button @click="closeAlert" class="ml-4 font-bold">✕</button>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'AlertMessage',
  props: {
    message: {
      type: String,
      required: true
    },
    tipo: {
      type: String,
      default: 'success', // por defecto sera rojo
    }
  },
  setup() {
    
    const visible = ref(true)

    const closeAlert = () => {
      visible.value = false
    }

    return { visible, closeAlert }
  }
})
</script>
