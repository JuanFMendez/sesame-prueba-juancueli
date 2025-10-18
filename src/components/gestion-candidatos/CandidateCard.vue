<template>
  <div class="flex flex-col w-full bg-gray-50 rounded-xl shadow-md p-4 border border-gray-200">

    <div class="flex justify-between items-start">

      <h1 class="font-especifico-medium text-azulOscuro">{{ nombreTruncado }}</h1>

      <div class="relative" ref="menuExpandido">

        <button @click="menuOpen = !menuOpen" class="text-gray-500 hover:text-gray-700 focus:outline-none">
          <MoreVertical class="w-5 h-5" />
        </button>

        <div v-if="menuOpen" class="absolute right-0 mt-2 w-28 bg-white border border-gray-300 rounded-md shadow-md z-10">
          
          <ul class="flex flex-col">
            <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md" 
                @click="abrirModalEdicion(candidate)">
              {{ t('menu.edit') }}
            </li>
          </ul>

        </div>

      </div>
    </div>

    <div class="flex items-center text-xs text-gray-300 mt-1">
      <Clock class="w-4 h-4 mr-1 text-gray-400" />
      <span class="font-medium text-gray-300">{{ fechaCreacionFormateada }}</span>
    </div>

    <CandidateModal v-if="modalVisible" :candidateData="candidatoSeleccionado!" @close="modalVisible = false" @updated="emitUpdated" />

  </div>
</template>

<script lang="ts">

  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { Clock, MoreVertical } from 'lucide-vue-next'
  import type { Candidate } from '../../domain/entities/Candidate'
  import CandidateModal from './addCandidate/CandidateModal.vue'
  import { formatearFecha } from '../../utils/dateUtil'
  import { truncarYCapitalizarNombre } from '../../utils/stringUtil'

  export default defineComponent({
    name: 'CandidateCard',
    components: { Clock, MoreVertical, CandidateModal },
    props: {
      candidate: { type: Object as () => Candidate, required: true }
    },
    emits: ['updated'],
    setup(props, { emit }) {

      const { t } = useI18n()

      const menuOpen = ref(false)
      const menuExpandido = ref<HTMLElement | null>(null)
      const modalVisible = ref(false)
      const candidatoSeleccionado = ref<Candidate | null>(null)

      const fechaCreacionFormateada = computed(() => formatearFecha(props.candidate.createdAt))

      const nombreTruncado = computed(() => {
        const nombreCompleto = `${props.candidate.firstName} ${props.candidate.lastName}`
        return truncarYCapitalizarNombre(nombreCompleto, 22)
      })

      const abrirModalEdicion = (candidate: Candidate) => {
        candidatoSeleccionado.value = candidate
        modalVisible.value = true
        menuOpen.value = false
      }

      const clickOutMenu = (event: MouseEvent) => {
        if (menuExpandido.value && !menuExpandido.value.contains(event.target as Node)) {
          menuOpen.value = false
        }
      }

      const emitUpdated = () => {
        emit('updated')
      }

      onMounted(() => {
        document.addEventListener('click', clickOutMenu)
      })

      return { menuOpen, menuExpandido, modalVisible, candidatoSeleccionado, fechaCreacionFormateada, nombreTruncado, abrirModalEdicion, emitUpdated, t }
    }

  })

</script>
