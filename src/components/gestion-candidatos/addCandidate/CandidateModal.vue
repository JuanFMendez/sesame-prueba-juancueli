<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/30 z-50">

    <!-- @click.stop evita cerrar modal al click dentro -->
    <div class="bg-white w-full max-w-2xl rounded-xl shadow-lg p-0" @click.stop>

      <!-- Header -->
      <div class="flex justify-between items-center w-full px-4 py-4 bg-gray-100 rounded-t-xl">
        <h2 class="font-especifico text-3xl text-azulOscuro">{{ modalTitle }}</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-800 text-xl font-bold flex items-center justify-center w-10 h-10 button-focus">
          ✕
        </button>
      </div>

      <!-- Zona principal para mostrar alertas -->
      <AlertMessage v-if="alerta.visible" :message="alerta.message" @close="alerta.cerrar()" />

      <form @submit.prevent="submitForm" class="space-y-4 px-6 py-4">

        <!-- Nombre y Apellido -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-normal mb-1 text-lila">Nombre <span class="text-red-500">*</span></label>
            <input v-model="candidate.firstName" type="text" class="w-full border border-gray-300 rounded-md px-3 py-2 focus-lila" required minlength="2" maxlength="30" pattern="^[A-Za-z\s]+$" />
          </div>
          <div>
            <label class="block text-sm font-normal mb-1 text-lila">Apellido <span class="text-red-500">*</span></label>
            <input v-model="candidate.lastName" type="text" class="w-full border border-gray-300 rounded-md px-3 py-2 focus-lila" required minlength="2" maxlength="30" pattern="^[A-Za-z\s]+$" />
          </div>
        </div>

        <!-- Email y Estado -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-normal mb-1 text-lila">Email <span class="text-red-500">*</span></label>
            <input v-model="candidate.email" type="email" class="w-full border border-gray-300 rounded-md px-3 py-2 focus-lila" required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" title="Introduce un email válido" />
          </div>
          <div>
            <label class="block text-sm font-normal mb-1 text-lila">Estado <span class="text-red-500">*</span></label>
            <select v-model="candidate.statusId" class="w-full border border-gray-300 rounded-md px-3 py-2 focus-lila" required>
              <option v-for="status in vacancyCandidateStatuses" :key="status.id" :value="status.id">{{ status.name }}</option>
            </select>
          </div>
        </div>

        <!-- Telefono y Fecha de inicio -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-normal mb-1 text-lila">Teléfono <span class="text-red-500">*</span></label>
            <input v-model="candidate.phone" type="text" class="w-full border border-gray-300 rounded-md px-3 py-2 focus-lila" required pattern="^\d{9}$" title="Introduce exactamente 9 números" />
          </div>
          <div>
            <label class="block text-sm font-normal mb-1 text-lila">Fecha de inicio <span class="text-red-500">*</span></label>
            <input v-model="candidate.startWorkDate" :min="minHoy" type="date" class="w-full border border-gray-300 rounded-md px-3 py-2 focus-lila" required />
          </div>
        </div>

        <!-- Dirección -->
        <div>
          <label class="block text-sm font-normal mb-1 text-lila">Dirección</label>
          <input v-model="candidate.address" type="text" class="w-full border border-gray-300 rounded-md px-3 py-2 focus-lila" minlength="5" maxlength="50" />
        </div>

        <!-- Comentario -->
        <div>
          <label class="block text-sm font-normal mb-1 text-lila">Comentario</label>
          <textarea v-model="candidate.comment" class="w-full border border-gray-300 rounded-md px-3 py-2 focus-lila" minlength="5" maxlength="120"></textarea>
        </div>

        <!-- Botones -->
        <div class="flex justify-end gap-2 mt-4">
          <button type="button" class="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 button-focus" @click="closeModal">Cancelar</button>
          <button type="submit" class="px-4 py-2 rounded-md btn-lila disabled:opacity-50 button-focus" :disabled="!formIsValid">{{ submitButtonText }}</button>
        </div>

      </form>
      
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, computed, onMounted } from 'vue'
  import { useCandidateStore } from '../../../store/candidateStore'
  import { VacancyService } from '../../../infra/services/VacancyService'
  import type { Candidate } from '../../../domain/entities/Candidate'
  import type { CandidateStatus } from '../../../domain/entities/CandidateStatus'
  import { useLoaderStore } from '../../../store/loaderStore'
  import { Alerta } from '../../../domain/entities/Alerta'
  import AlertMessage from '../../AlertMessage.vue'

  export default defineComponent({
    name: 'CandidateModal',
    props: {
      candidateData: { type: Object as () => Candidate, required: false }
    },
    emits: ['close', 'added', 'updated'],
    components: { AlertMessage },
    setup(props, { emit }) {

      const candidateStore = useCandidateStore()
      const loaderStore = useLoaderStore()
      const vacancyService = new VacancyService();

      const vacancyId = import.meta.env.VITE_DEFAULT_VACANCY_ID

      //fecha minima para el calendario
      const minHoy = new Date().toISOString().split('T')[0] 

      //titulo del modal si tiene o no datos el candidato
      const modalTitle = computed(() =>
        props.candidateData ? 'Editar candidato' : 'Añadir nuevo candidato'
      )

      //texto boton si tiene o no datos el candidato
      const submitButtonText = computed(() =>
        candidate.id ? 'Actualizar candidato' : 'Añadir candidato'
      )

      //alerta para error o accion correcta
      const alerta = reactive(new Alerta(''))

      // Lista de estados de candidato
      const vacancyCandidateStatuses = ref<CandidateStatus[]>([])

      // Datos basicos para un candidato nuevo
      const defaultCandidate: Candidate = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        linkedInURL: '',
        desiredSalary: '',
        startWorkDate: '',
        web: '',
        location: '',
        vacancyId, // por defecto ya lleva la vacanteId
        statusId: '',
        address: '',
        comment: '',
        appliedAt: new Date().toISOString(),
        type: '',
        hasDocument: false,
        imageProfileURL: '',
        evaluation: 0,
        threadId: '',
        lastComment: null,
        numComments: 0,
        createdAt: '',
        updatedAt: '',
        employeeId: '',
        vacancy: { id: '', name: '', companyId: '', status: '' },
        status: { id: '', name: '', companyId: '', order: 0 }
      }

      // O recogemos el candidato en un props o hacemos una copia de los datos iniciales
      const candidate = reactive<Candidate>({ ...defaultCandidate, ...props.candidateData })

      // Validaciones del formulario 
      const formIsValid = computed(() =>
        candidate.firstName.trim() &&
        candidate.lastName.trim() &&
        candidate.email.trim() &&
        candidate.phone.trim() &&
        candidate.statusId &&
        candidate.startWorkDate
      )
      
      onMounted(async () => {

        // por defecto cierra la alerta
        alerta.cerrar()

        await loaderStore.loadWithSpinner(
          (async () => {
            try {

              // carga los estados de candidato disponibles              
              vacancyCandidateStatuses.value = await vacancyService.getCandidateStatuses(vacancyId)

              // Si no hay estados disponibles, muestra error
              if (!vacancyCandidateStatuses.value || vacancyCandidateStatuses.value.length === 0) {
                alerta.message = 'No hay estados de candidato disponibles'
                alerta.tipo = 'error'
                alerta.visible = true                

              // Si el candidato tiene estado lo mantiene por defecto para mostrar. Si no, asigna el primero de la lista            
              } else if (!candidate.statusId && vacancyCandidateStatuses.value[0]) {
                candidate.statusId = vacancyCandidateStatuses.value[0].id
              }

            } catch (error) {
              console.error('Error cargando estados del candidato:', error)
              alerta.message = 'Error cargando estados del candidato'
              alerta.tipo = 'error'
              alerta.visible = true              
            }
          })()
        )
      })

      // Submit formulario
      const submitForm = async () => {
        await loaderStore.loadWithSpinner(
          (async () => {
            try {

              // Limpiar campos de texto de espacios en blanco
              candidate.firstName = candidate.firstName.trim()
              candidate.lastName = candidate.lastName.trim()
              candidate.email = candidate.email.trim()
              candidate.phone = candidate.phone.trim()
              candidate.address = candidate.address?.trim() || ''
              candidate.comment = candidate.comment?.trim() || ''

              // Si el candidato tiene id, se actualiza.
              if (candidate.id) {
                await candidateStore.updateCandidate(candidate.id, candidate)
                emit('updated', true)

              // Si no tiene id, se crea uno nuevo
              } else {
                await candidateStore.addCandidateToVacancy(candidate)
                emit('added', true)

              }
              //cerramos modal
              closeModal()

            } catch (error) {

              console.error('Error en la gestion del candidato:', error)
              alerta.message = 'Error en la gestion del candidato'
              alerta.tipo = 'error'
              alerta.visible = true              
            }

          })()
        )
      }

      //funcion simplicar emit
      const closeModal = () => emit('close')

      return { candidate, vacancyCandidateStatuses, submitForm, closeModal, formIsValid, alerta, modalTitle, submitButtonText , minHoy}
      
    },
  })

</script>
