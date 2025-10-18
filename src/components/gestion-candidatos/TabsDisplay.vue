<template>

  <div class="relative border-b border-gray-300 mb-4">

    <div class="flex space-x-4">

      <!-- pestaña vacantes -->
      <button class="px-4 py-2 -mb-px" 
        :class="[ 'border-b-2 px-4 py-2', activeTab === 'vacantes' ? 'text-lila font-bold font-especifico' : 'border-transparent text-gray-300 font-normal opacity-50 font-especifico-ligth']"
        @click="seccionSelected('vacantes')"
      >
        {{ t('tabs.vacancies') }}
      </button>

      <!-- pestaña candidatos -->
      <button class="px-4 py-2 -mb-px" 
        :class="['border-b-2 px-4 py-2', activeTab === 'candidatos' ? 'text-lila font-bold font-especifico': 'border-transparent text-gray-300 font-normal opacity-50 font-especifico-ligth']"
        @click="seccionSelected('candidatos')"
      >
        {{ t('tabs.candidates') }}
      </button>
    </div>

  </div>

</template>

<script lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'TabsDisplay',
  emits: ['seccionSelected'], 
  setup(props, { emit }) {

    const { t } = useI18n()

    //tab activa por defecto
    const activeTab = ref('vacantes')

    //seleccion de pestania y emitir evento
    const seccionSelected = (tabSeleccionado: string) => {
      activeTab.value = tabSeleccionado
      emit('seccionSelected', tabSeleccionado) 
    }

    return { activeTab, seccionSelected, t }
  }
}
</script>
