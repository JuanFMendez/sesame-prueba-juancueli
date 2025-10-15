<template>
  <div class="flex flex-col w-full h-full space-y-4">

    <!-- pestanias -->
    <TabsDisplay @seccionSelected="emitSeccionSeleccionada" />

    <!-- Buscador y boton de aniadir candidato -->
    <div class="flex justify-between items-center mb-4">
      <SearchBar :seccionActiva="activeSection" @search="emitBusqueda" />
      <!-- emite evento de aniadido para mostrar alertas-->
      <AddCandidateButton @added="onCandidateAdded"/>
    </div>

    <!-- mensajes de alerta -->
    <AlertMessage v-if="alerta.visible" :message="alerta.message" @close="alerta.cerrar()" />

    <!-- Contenedor principal de displays -->
    <div class="flex-1 border border-gray-200 rounded-lg overflow-auto w-full h-full">
      <div class="w-full">
        
        <TableDisplayVacantes v-if="activeSection === 'vacantes'" :textoFiltro="searchText" />
        
        <!-- emite evento de editado para mostrar alerta -->
        <TableDisplayCandidatos v-else-if="activeSection === 'candidatos'" :textoFiltro="searchText" @updated="onCandidateUpdated" />

      </div>
    </div>

  </div>

</template>

<script lang="ts">

  import { defineComponent, ref, reactive, onMounted } from 'vue'
  import TabsDisplay from './TabsDisplay.vue'
  import SearchBar from './SearchBar.vue'
  import AddCandidateButton from './addCandidate/AddCandidateButton.vue'
  import TableDisplayVacantes from './TableDisplayVacantes.vue'
  import TableDisplayCandidatos from './TableDisplayCandidatos.vue'
  import { Alerta } from '../../domain/entities/Alerta'
  import AlertMessage from '../AlertMessage.vue'

  export default defineComponent({
    name: 'GestionBoard',
    components: {
      TabsDisplay,
      SearchBar,
      AddCandidateButton,
      TableDisplayVacantes,
      TableDisplayCandidatos,
      AlertMessage
    },
    setup() {

      const activeSection = ref('vacantes')
      const searchText = ref('')
      const alerta = reactive(new Alerta(''))

      // Emite la seccion seleccionada en las pestañas
      const emitSeccionSeleccionada = (section: string) => {
        activeSection.value = section
      }

      // Emite el texto de busqueda ingresado
      const emitBusqueda = (text: string) => {
        searchText.value = text
      }

      // Muestra una alerta de exito con el mensaje dado
      const mostrarAlertaExito = (mensaje: string) => {
        alerta.message = mensaje
        alerta.visible = true
        alerta.tipo = 'success'      
        setTimeout(() => alerta.cerrar(), 3000)
      }

      // Maneja la accion de agregar un candidato
      const onCandidateAdded = (success: boolean) => {
        if (success) mostrarAlertaExito('Candidato agregado correctamente.')
      }
      // Maneja la accion de actualizar un candidato
      const onCandidateUpdated = (success: boolean) => {
        if (success) mostrarAlertaExito('Candidato modificado correctamente.')
      }

      onMounted(() => {
        alerta.cerrar()
      })

      return {
        activeSection,
        searchText,
        alerta,
        emitSeccionSeleccionada,
        emitBusqueda,
        onCandidateAdded,
        onCandidateUpdated
      }
    }
  })
</script>
