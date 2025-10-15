<template>
  <div>
    <button class="btn-azulOscuro text-sm font-normal px-4 py-1.5 rounded-xl shadow-sm" @click="showModal = true">
      Añadir candidato
    </button>
    <!-- emit para cerrar modal y confimando quee se agrego candidato -->
    <CandidateModal v-if="showModal" @close="showModal = false" @added="$emit('added', $event)"
/>  </div>
</template>

<script lang="ts">

  import { defineComponent, ref } from 'vue'
  import CandidateModal from './CandidateModal.vue'

  export default defineComponent({
    name: 'AddCandidateButton',
    components: { CandidateModal },
    emits: ['added'],
    setup() {
      const showModal = ref(false)
      return { showModal }
    },
  })

</script>
