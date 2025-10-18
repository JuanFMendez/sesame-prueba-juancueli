import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import TableDisplayVacantes from '../../../components/gestion-candidatos/TableDisplayVacantes.vue'
import { useCandidateStore } from '../../../store/candidateStore'
import { useLoaderStore } from '../../../store/loaderStore'
import { VacancyService } from '../../../infra/services/VacancyService'
import { createI18n } from 'vue-i18n'

// Mock de los stores y del servicio
vi.mock('../../../store/candidateStore', () => ({
  useCandidateStore: vi.fn()
}))

vi.mock('../../../store/loaderStore', () => ({
  useLoaderStore: vi.fn()
}))

vi.mock('../../../infra/services/VacancyService', () => ({
  VacancyService: vi.fn()
}))

// Configuración mínima de i18n para los tests
const i18n = createI18n({
  legacy: false,
  locale: 'es',
  messages: {
    es: {
      messages: {
        noCandidates: 'No hay candidatos'
      }
    }
  }
})

describe('TableDisplayVacantes', () => {
  let mockCandidateStore: any
  let mockLoaderStore: any
  let mockVacancyService: any

  beforeEach(() => {
    // Mock del store de candidatos con métodos simulados
    mockCandidateStore = {
      getCandidatesByVacancyId: vi.fn().mockResolvedValue([
        { id: '1', firstName: 'Juan', lastName: 'Pérez', email: 'juan@test.com', statusId: 's1' }
      ]),
      updateCandidate: vi.fn().mockResolvedValue(true),
      candidatesAll: []
    }

    // Mock del loader store que ejecuta callbacks con spinner
    mockLoaderStore = {
      loadWithSpinner: vi.fn(async (callback: any) => {
        if (typeof callback === 'function') return await callback()
        return callback
      })
    }

    // Mock del servicio de vacantes para devolver estados de candidato
    mockVacancyService = {
      getCandidateStatuses: vi.fn().mockResolvedValue([
        { id: 's1', name: 'Pendiente' },
        { id: 's2', name: 'Aprobado' }
      ])
    }

    // Asignamos los mocks a los stores y servicio
    ;(useCandidateStore as any).mockReturnValue(mockCandidateStore)
    ;(useLoaderStore as any).mockReturnValue(mockLoaderStore)
    ;(VacancyService as any).mockImplementation(() => mockVacancyService)

    vi.clearAllMocks()
  })

  // Función para montar el componente de forma segura y evitar errores de render
  const mountSafe = async () => {
    const wrapper = mount(TableDisplayVacantes, {
      global: {
        plugins: [i18n],
        stubs: ['CandidateCard', 'Archive', 'User', 'PartyPopper', 'Ban'] // ignoramos componentes hijos e iconos
      }
    })
    // evitamos error por undefined en propiedades reactivas
    ;(wrapper.vm as any).candidatesFilteredByText = { value: [] }
    ;(wrapper.vm as any).filteredCandidates = () => []
    await flushPromises()
    return wrapper
  }

  // Test 1: Verifica que al montar el componente se llaman los métodos getCandidateStatuses y getCandidatesByVacancyId
  it('Test 1: llama a getCandidateStatuses y getCandidatesByVacancyId en onMounted', async () => {
    await mountSafe()
    expect(mockVacancyService.getCandidateStatuses).toHaveBeenCalled()
    expect(mockCandidateStore.getCandidatesByVacancyId).toHaveBeenCalled()
  })

  // Test 2: Verifica que la función refreshAllCandidates emite el evento "updated" con valor true
  it('Test 2: refreshAllCandidates emite "updated" con true', async () => {
    const wrapper = await mountSafe()
    await (wrapper.vm as any).refreshAllCandidates()
    await flushPromises()
    expect(wrapper.emitted('updated')).toBeTruthy()
    expect(wrapper.emitted('updated')![0]).toEqual([true])
  })
})
