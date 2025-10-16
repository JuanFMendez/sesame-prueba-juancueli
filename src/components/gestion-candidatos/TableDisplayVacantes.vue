<template>
  <div class="h-full flex-1 flex flex-col">
    <!-- fila de cards que ocupa todo el ancho -->
    <div class="flex h-full gap-4 w-full">
      <div
        v-for="(status, index) in vacancyCandidateStatuses"
        :key="status.id"
        class="flex-1 h-full bg-gray-100 rounded-2xl shadow-lg flex flex-col p-4"
      >
        <!-- Línea superior de color del card -->
        <div :class="[bgColors[index], 'h-1 w-full rounded-full mb-2']"></div>

        <!-- Título con icono a la izquierda -->
        <div class="flex items-center gap-2 mb-2">
          <component
            :is="icons[index]"
            class="w-5 h-5"
            :class="colors[index]"
          />
          <span class="font-semibold">{{ status.name }}</span>
        </div>

        <!-- Contenedor inferior que ocupa el resto de la altura -->
        <div class="flex-1 bg-white rounded-xl p-2 flex items-center justify-center">
          Contenido
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Archive, User, PartyPopper, Ban } from 'lucide-vue-next'
import { useLoaderStore } from '../../store/loaderStore'
import { VacancyService } from '../../domain/services/VacancyService'
import type { CandidateStatus } from '../../domain/entities/CandidateStatus'

export default defineComponent({
  name: 'VacancyStatuses',
  components: { Archive, User, PartyPopper, Ban },
  setup() {
    const loaderStore = useLoaderStore()
    const vacancyService = new VacancyService()
    const vacanteIdDefault = import.meta.env.VITE_DEFAULT_VACANCY_ID

    const vacancyCandidateStatuses = ref<CandidateStatus[]>([])
    const alerta = ref({ visible: false, message: '', tipo: 'error' as 'error' | 'success' })

    // Íconos y colores por índice
    const icons = [Archive, User, PartyPopper, Ban]
    const colors = ['text-green-500', 'text-teal-400', 'text-blue-500', 'text-red-500']
    const bgColors = ['bg-green-500', 'bg-teal-400', 'bg-blue-500', 'bg-red-500'] 

    const fetchStatuses = async () => {
      await loaderStore.loadWithSpinner(
        (async () => {
          try {
            vacancyCandidateStatuses.value = await vacancyService.getCandidateStatuses(vacanteIdDefault)
            if (!vacancyCandidateStatuses.value || vacancyCandidateStatuses.value.length === 0) {
              alerta.value.message = 'No hay estados de candidato disponibles'
              alerta.value.visible = true
              alerta.value.tipo = 'error'
            }
          } catch (error) {
            console.error('Error cargando estados:', error)
            alerta.value.message = 'Error cargando estados del candidato'
            alerta.value.visible = true
            alerta.value.tipo = 'error'
          }
        })()
      )
    }

    onMounted(async () => {
      await fetchStatuses()
    })

    return { vacancyCandidateStatuses, alerta, icons, colors, bgColors }
  }
})
</script>
