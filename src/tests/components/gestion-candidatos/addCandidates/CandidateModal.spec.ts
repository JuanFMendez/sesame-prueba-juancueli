import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import CandidateModal from '../../../../components/gestion-candidatos/addCandidate/CandidateModal.vue'
import type { CandidateStatus } from '../../../../domain/entities/CandidateStatus'

// Mock del servicio VacancyService
vi.mock('../../../../infra/services/VacancyService', () => ({
  VacancyService: vi.fn().mockImplementation(() => ({
    getCandidateStatuses: vi.fn().mockResolvedValue([
      { id: '1', name: 'Seleccionado', order: 1, companyId: 'empresa-1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), vacancyId: 'A' }
    ])
  }))
}))

// Mock del candidateStore
vi.mock('../../../../store/candidateStore', () => {
  return {
    useCandidateStore: vi.fn(() => ({
      addCandidateToVacancy: vi.fn().mockResolvedValue(true),
      updateCandidate: vi.fn().mockResolvedValue(true)
    }))
  }
})

describe('CandidateModal - formulario mínimo', () => {
  let pinia: ReturnType<typeof createPinia>

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  // Test 1: Enviar formulario con datos mínimos y emitir evento "added"
  it('envía el formulario rellenando los datos y emite "added"', async () => {
    // Creamos un array mock de estados de candidato
    const mockStatuses: CandidateStatus[] = [{
      id: '1',
      name: 'Seleccionado',
      order: 1,
      companyId: 'empresa-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      vacancyId: 'A'
    }]

    // Montamos el componente con Pinia y datos iniciales
    const wrapper = mount(CandidateModal, {
      global: { plugins: [pinia] },
      data() {
        return { vacancyCandidateStatuses: mockStatuses }
      }
    })

    // Rellenamos los campos del formulario directamente
    wrapper.vm.candidate.firstName = 'Juan'
    wrapper.vm.candidate.lastName = 'Cueli'
    wrapper.vm.candidate.email = 'juan@test.com'
    wrapper.vm.candidate.phone = '123456789'
    wrapper.vm.candidate.startWorkDate = new Date().toISOString().split('T')[0]!
    wrapper.vm.candidate.statusId = mockStatuses[0]!.id

    // Simulamos el envío del formulario
    await wrapper.find('form').trigger('submit.prevent')

    // Verificamos que se emitió el evento 'added' tras enviar
    expect(wrapper.emitted('added')).toBeTruthy()
  })
})
