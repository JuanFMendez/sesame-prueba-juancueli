<template>
  <div class="flex flex-col w-full bg-gray-50 rounded-xl shadow-md p-4 border border-gray-200">

    <div class="flex justify-between items-start">

      <!-- nombre limitado para los ... -->
      <h1 class="font-especifico2 font-bold text-azulOscuro">{{ nombreTruncado }}</h1>

      <!-- seleccionamos contenedor como menu expandido para poder cerrar si clickan fuera-->
      <div class="relative" ref="menuExpandido">

        <!-- icono de tres puntos vertical -->
        <button @click="menuOpen = !menuOpen" class="text-gray-500 hover:text-gray-700 focus:outline-none">
          <MoreVertical class="w-5 h-5" />
        </button>
        <!-- listado de opciones si se clicka los tres puntos -->
        <div v-if="menuOpen" class="absolute right-0 mt-2 w-28 bg-white border border-gray-300 rounded-md shadow-md z-10">
          
          <ul class="flex flex-col">
            <!-- seleccionar en el menu opcion editar -->
            <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md" @click="abrirModalEdicion(candidate)">
              Modificar
            </li>
          </ul>

        </div>

      </div>
    </div>

    <!-- Fecha con formato de hoy, ayer, numero de dias -->
    <div class="flex items-center text-xs text-gray-300 mt-1">
      <!-- icono de reloj -->
      <Clock class="w-4 h-4 mr-1 text-gray-400" />
      <span class="font-medium text-gray-300">{{ fechaCreacionFormateada }}</span>
    </div>

    <!-- Modal de edición -->
    <CandidateModal v-if="modalVisible" :candidateData="candidatoSeleccionado!" @close="modalVisible = false" @updated="emitUpdated" />

  </div>
</template>

<script lang="ts">

  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { Clock, MoreVertical } from 'lucide-vue-next'
  import type { Candidate } from '../domain/entities/Candidate'
  import CandidateModal from '../components/gestion-candidatos/addCandidate/CandidateModal.vue'
  import { formatearFecha } from '../utils/dateUtil'
  import { truncarYCapitalizarNombre } from '../utils/stringUtil'

  export default defineComponent({
    name: 'CandidateCard',
    components: { Clock, MoreVertical, CandidateModal },
    props: {
      candidate: { type: Object as () => Candidate, required: true }
    },
    emits: ['updated'],
    setup(props, { emit }) {

      //valor por defecto visibilidad del menu de 3 puntos 
      const menuOpen = ref(false)
      //menu que se genera con los 3 puntos
      const menuExpandido = ref<HTMLElement | null>(null)
      const modalVisible = ref(false)

      const candidatoSeleccionado = ref<Candidate | null>(null)

      //fecha formateada para mostrar como texto desde utils
      const fechaCreacionFormateada = computed(() => formatearFecha(props.candidate.createdAt))

      //nombre truncado para maximo 23 caracteres y ...
      const nombreTruncado = computed(() => {
        const nombreCompleto = `${props.candidate.firstName} ${props.candidate.lastName}`
        return truncarYCapitalizarNombre(nombreCompleto, 22)
      })


      //seleccionamos el candidato y abrimos modal
      const abrirModalEdicion = (candidate: Candidate) => {
        candidatoSeleccionado.value = candidate
        modalVisible.value = true
        menuOpen.value = false
      }

      //funcion listener para controlar si debemos cerrar el menu una vez clickan fuera 
      const clickOutMenu = (event: MouseEvent) => {
        //comprobamos que exista menu expandido y si el elemento clickado no es el menu.
        //si no lo es, cerramos el menu
        if (menuExpandido.value && !menuExpandido.value.contains(event.target as Node)) {
          menuOpen.value = false
        }
      }

      const emitUpdated = () => {
        emit('updated')
      }

      //listener de click sobre cualquier componente que no sea 3 puntos
      onMounted(() => {
        document.addEventListener('click', clickOutMenu)
      })

      return { menuOpen, menuExpandido, modalVisible, candidatoSeleccionado, fechaCreacionFormateada, nombreTruncado, abrirModalEdicion, emitUpdated }
    }

  })

</script>
