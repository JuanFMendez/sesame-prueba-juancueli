<template>
  <div>
    <button class="font-especifico-ligth  btn-azulOscuro text-sm font-normal px-4 py-1.5 rounded-xl shadow-sm" @click="showModal = true">
        {{ t('btn.add') }}
    </button>
    
    <!-- emit para cerrar modal y confimando quee se agrego candidato -->
    <CandidateModal v-if="showModal" @close="showModal = false" @added="emitAdded"/>
    
  </div>
</template>

<script lang="ts">

  import { defineComponent, ref } from 'vue'
  import CandidateModal from './CandidateModal.vue'
  import { useI18n } from 'vue-i18n'


  export default defineComponent({
    name: 'AddCandidateButton',
    components: { CandidateModal },
    emits: ['added'],
    setup(props, { emit }) {
      
      const showModal = ref(false)
      const { t } = useI18n()

      const emitAdded = (candidate : any) => {
        emit('added', candidate)
        showModal.value = false
      }


      return { showModal,emitAdded, t }
    },
  })

</script>
