import { mount, flushPromises } from '@vue/test-utils'
import CandidateTable from '../../../components/gestion-candidatos/TableDisplayCandidatos.vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCandidateStore } from '../../../store/candidateStore'
import { useLoaderStore } from '../../../store/loaderStore'
import { createI18n } from 'vue-i18n'

// Mock de CandidateModal para no renderizarlo realmente
vi.mock('../../../components/gestion-candidatos/addCandidate/CandidateModal.vue', () => ({
  default: {
    template: '<div class="candidate-modal-mock"></div>',
    props: ['candidateData'],
    emits: ['close', 'updated']
  }
}))

// Configuración mínima de i18n para los tests
const i18n = createI18n({
  legacy: false,
  locale: 'es',
  messages: {
    es: {
      label: {
        firstName: 'Nombre',
        lastName: 'Apellido',
        email: 'Correo',
        status: 'Estado'
      },
      btn: {
        editCorto: 'Editar'
      }
    }
  }
})

describe('CandidateTable.vue', () => {
  let wrapper: any
  let candidateStore: ReturnType<typeof useCandidateStore>
  let loaderStore: ReturnType<typeof useLoaderStore>

  // Mock de candidatos
  const mockCandidates = [
    { id: '1', firstName: 'Juan', lastName: 'Pérez', email: 'juan@test.com', status: { name: 'Seleccionado' } },
    { id: '2', firstName: 'Ana', lastName: 'García', email: 'ana@test.com', status: { name: 'Pendiente' } }
  ]

  beforeEach(async () => {
    // Inicializamos Pinia
    setActivePinia(createPinia())
    candidateStore = useCandidateStore()
    loaderStore = useLoaderStore()

    // Mock del método getCandidatesByVacancyId para que llene candidatesAll de forma reactiva
    vi.spyOn(candidateStore, 'getCandidatesByVacancyId').mockImplementation(async () => {
      candidateStore.$patch({ candidatesAll: mockCandidates }) // ⚡ Usar $patch mantiene reactividad
    })

    // Montamos el componente con el mock del modal y i18n
    wrapper = mount(CandidateTable, {
      global: {
        plugins: [i18n],
        stubs: { CandidateModal: true }
      }
    })

    // Esperamos a que se ejecuten los hooks onMounted
    await flushPromises()
  })

  // Test 1: Muestra datos correctos en las celdas
  it('muestra datos correctos en las celdas', () => {
    const filas = wrapper.findAll('tbody tr')
    expect(filas[0].text()).toContain('Juan')
    expect(filas[0].text()).toContain('Pérez')
    expect(filas[0].text()).toContain('juan@test.com')
    expect(filas[0].text()).toContain('Seleccionado')
  })

  // Test 2: Filtrado por texto actualiza la lista
  it('filtra candidatos según textoFiltro', async () => {
    await wrapper.setProps({ textoFiltro: 'Ana' })
    const filas = wrapper.findAll('tbody tr')
    expect(filas).toHaveLength(1)
    expect(filas[0].text()).toContain('Ana')
  })

  // Test 3: Abre modal al hacer click en botón "Editar"
  it('abre modal al hacer click en "Editar"', async () => {
    const btnEditar = wrapper.find('tbody tr:first-child button')
    await btnEditar.trigger('click')
    expect(wrapper.vm.showCandidateModal).toBe(true)
    expect(wrapper.vm.candidateToEdit.firstName).toBe('Juan')
  })

  // Test 4: Abre modal al hacer doble click en fila
  it('abre modal al hacer doble click en la fila', async () => {
    const fila = wrapper.find('tbody tr:first-child')
    await fila.trigger('dblclick')
    expect(wrapper.vm.showCandidateModal).toBe(true)
    expect(wrapper.vm.candidateToEdit.firstName).toBe('Juan')
  })

  // Test 5: refreshCandidates actualiza lista y emite evento
  it('refreshCandidates actualiza candidatos y emite evento', async () => {
    await wrapper.vm.refreshCandidates()
    // Verifica que la lista se actualizó
    expect(wrapper.vm.candidates).toEqual(mockCandidates)
    // Verifica que el evento 'updated' se emitió con true
    expect(wrapper.emitted('updated')).toBeTruthy()
    expect(wrapper.emitted('updated')![0]).toEqual([true])
    // Verifica que se cerró el modal
    expect(wrapper.vm.showCandidateModal).toBe(false)
  })
})
