<template>
  <div class="relative w-56">
    <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
      <Search class="w-4 h-4 text-gray-400" />
    </span>

    <input
      type="text"
      placeholder="Buscar"
      class="input-buscar pl-10 pr-3 py-1.5 text-sm w-full rounded-xl border focus:outline-none focus:ring-0"
      v-model="searchText"
      @input="emitSearch"
      :title="tooltipText"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'

export default {
  name: 'SearchBar',
  components: { Search },
  props: {
    seccionActiva: {
      type: String,
      required: false,
      default: 'vacantes'
    }
  },
  emits: ['search'],
  setup(props, { emit }) {
    const searchText = ref('')

    const emitSearch = () => emit('search', searchText.value)

    const tooltipText = computed(() => {
      return props.seccionActiva === 'vacantes'
        ? 'Buscar por ID, nombre, descripción, estado o tipo de contrato'
        : 'Buscar por ID, nombre, email, estado o vacante asociada'
    })

    return { searchText, emitSearch, tooltipText }
  }
}
</script>
