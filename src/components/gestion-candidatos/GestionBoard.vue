<template>
  <div class="flex flex-col w-full h-full space-y-4">
    
    <!-- Pestañas -->
    <TabsDisplay @seccionSelected="emitSeccionSeleccionada" />

    <!-- Buscador y botón -->
    <div class="flex justify-between items-center mb-4">
      <SearchBar :seccionActiva="activeSection" @search="emitBusqueda" />
      <AddCandidateButton @added="onCandidateAdded" @updated="onCandidateUpdated"/>
    </div>

    <!-- Alerta de éxito o error -->
    <AlertMessage v-if="alerta.visible" :message="alerta.message" @close="alerta.cerrar()"/>

    <!-- Contenedor de tablas con scroll independiente -->    
    <div class="flex-1 border border-gray-200 rounded-lg overflow-auto max-w-full max-h-full">
      <div class="inline-block">
        <TableDisplayVacantes v-if="activeSection === 'vacantes'" :textoFiltro="searchText"/>
        <TableDisplayCandidatos v-else-if="activeSection === 'candidatos'" :textoFiltro="searchText" />
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
      AlertMessage,
    },
    setup() {

      const activeSection = ref('vacantes')
      const searchText = ref('')
      const alerta = reactive(new Alerta(''))

      // Cambiar sección desde TabsDisplay
      const emitSeccionSeleccionada = (section: string) => {
        activeSection.value = section
      }

      // Actualizar texto de búsqueda
      const emitBusqueda = (text: string) => {
        searchText.value = text
      }

      //construimos variable de alerta de éxito
      const mostrarAlertaExito = (mensaje: string) => {
        alerta.message = mensaje
        alerta.visible = true
        alerta.tipo = 'success'
        setTimeout(() => alerta.cerrar(), 3000)
      }

      // Eventos desde AddCandidateButton
      const onCandidateAdded = (success: boolean) => {
        if (success) mostrarAlertaExito('Candidato agregado correctamente.')
      }

      const onCandidateUpdated = (success: boolean) => {
        if (success) mostrarAlertaExito('Candidato actualizado correctamente.')
      }

      onMounted(() => {
        // Aseguramos que la alerta esté cerrada al montar el componente
        alerta.cerrar()
      })  

      return { 
        activeSection, searchText,alerta, emitSeccionSeleccionada, emitBusqueda, onCandidateAdded, onCandidateUpdated 
      }
    }
  })
</script>
