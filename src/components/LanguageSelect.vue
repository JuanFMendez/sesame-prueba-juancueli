<template>
  <div class="relative flex justify-center">
    <!-- Botón principal: bandera seleccionada centrada vertical y horizontal -->
    <button 
      @click="dropdownOpen = !dropdownOpen"
      class="flex items-center justify-center w-10 h-10 "
    >
      <VueCountryFlag :country="selectedFlag" class=""/>
    </button>

    <!-- Dropdown hacia abajo, pegado al botón -->
    <div v-if="dropdownOpen" class="absolute top-full mt-0 flex flex-col items-center">
      <div 
        v-for="lang in otherLanguages" 
        :key="lang.code"
        class="flex justify-center cursor-pointer"
        @click="selectIdioma(lang.code)"
      >
        <VueCountryFlag :country="lang.flagCountry" class=""/>
      </div>
    </div>
    
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { availableLanguages } from '../i18n'
import VueCountryFlag from 'vue-country-flag-next'

const { locale } = useI18n()
const dropdownOpen = ref(false)

const selectedFlag = computed(() => {
  const lang = availableLanguages.find(l => l.code === locale.value)
  return lang?.flagCountry || 'ES'
})

// Filtra los idiomas que no son el seleccionado
const otherLanguages = computed(() => 
  availableLanguages.filter(l => l.code !== locale.value)
)

const selectIdioma = (code: string) => {
  locale.value = code
  localStorage.setItem('app-locale', code)
  dropdownOpen.value = false
}
</script>
