import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
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
vi.mock('../../../../store/candidateStore', () => ({
  useCandidateStore: vi.fn(() => ({
    addCandidateToVacancy: vi.fn().mockResolvedValue(true),
    updateCandidate: vi.fn().mockResolvedValue(true)
  }))
}))

describe('CandidateModal - formulario mínimo', () => {
  let pinia: ReturnType<typeof createPinia>

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })

  const i18n = createI18n({
    legacy: false,
    locale: 'es',
    messages: { es: {} }
  })

  it('envía el formulario rellenando los datos y emite "added"', async () => {
    const mockStatuses: CandidateStatus[] = [
      { id: '1', name: 'Seleccionado', order: 1, companyId: 'empresa-1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), vacancyId: 'A' }
    ]

    const wrapper = mount(CandidateModal, {
      global: { plugins: [pinia, i18n] },
      data() {
        return { vacancyCandidateStatuses: mockStatuses }
      }
    })

    // Accedemos a candidate con 'as any' para evitar error de TS
    const vm: any = wrapper.vm

    vm.candidate.firstName = 'Juan'
    vm.candidate.lastName = 'Cueli'
    vm.candidate.email = 'juan@test.com'
    vm.candidate.phone = '123456789'
    vm.candidate.startWorkDate = new Date().toISOString().split('T')[0]
    vm.candidate.statusId = mockStatuses[0]!.id  // assertion para evitar 'undefined'

    // Enviamos el formulario
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('added')).toBeTruthy()
  })
})
