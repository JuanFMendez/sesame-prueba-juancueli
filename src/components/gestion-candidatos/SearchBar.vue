<template>

  <div class="relative w-56">

    <!-- lupa por libreria -->
    <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
      <Search class="w-4 h-4 text-gray-400" />
    </span>

    <!-- texto a buscar -->
    <input
      type="text"
      :placeholder="t('search.placeholder')"
      class="font-especifico-ligth input-buscar pl-10 pr-8 py-1.5 text-sm w-65 rounded-xl border focus:outline-none focus:ring-0"
      v-model="searchText"
      @input="emitSearch"
      maxlength="25"
      :title="tooltipText"
    />

    <!-- boton x por libreria  -->
    <XIcon v-if="searchText" class="absolute top-1/2 right-3 w-4 h-4 text-gray-400 cursor-pointer transform -translate-y-1/2 hover:text-gray-600"
      @click="clearText"
    />
  </div>

</template>

<script lang="ts">

  import { ref, computed } from 'vue'
  import { Search, XIcon } from 'lucide-vue-next'
  import { useI18n } from 'vue-i18n'

  export default {
    name: 'SearchBar',
    components: { Search, XIcon },
    props: {
      seccionActiva: {
        type: String,
        required: false,
        default: 'vacantes'
      }
    },
    emits: ['search'],
    setup(props, { emit }) {

      const { t } = useI18n()

      const searchText = ref('')

      //emitir texto busqueda
      const emitSearch = () => {
        emit('search', searchText.value)
      }

      const tooltipText = computed(() => {

        //si no es vacantes es candidatos
        return props.seccionActiva === 'vacantes'
          ? t('search.vacanciesTooltip')
          : t('search.candidatesTooltip')
      })

      const clearText = () => {
        searchText.value = ''
        emitSearch()
      }

      return { searchText, emitSearch, clearText, tooltipText, t }
    }
  }
</script>
