<template>

  <div class="relative border-b border-gray-300 mb-4">

    <div class="flex space-x-4">

      <!-- pestaña vacantes -->
      <button class="px-4 py-2 -mb-px" 
        :class="[ 'border-b-2 px-4 py-2', activeTab === 'vacantes' ? 'text-lila font-bold' : 'border-transparent text-gray-300 font-normal opacity-50']"
        @click="seccionSelected('vacantes')"
      >
        Vacantes
      </button>

      <!-- pestaña candidatos -->
      <button class="px-4 py-2 -mb-px" 
        :class="['border-b-2 px-4 py-2', activeTab === 'candidatos' ? 'text-lila font-bold': 'border-transparent text-gray-300 font-normal opacity-50']"
        @click="seccionSelected('candidatos')"
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
  emits: ['seccionSelected'], 
  setup(props, { emit }) {

    //tab activa por defecto
    const activeTab = ref('vacantes')

    //seleccion de pestania y emitir evento
    const seccionSelected = (tabSeleccionado: string) => {
      activeTab.value = tabSeleccionado
      emit('seccionSelected', tabSeleccionado) 
    }

    return { activeTab, seccionSelected }
  }
}
</script>
