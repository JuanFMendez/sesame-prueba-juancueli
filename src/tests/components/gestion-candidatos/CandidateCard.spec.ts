import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CandidateCard from '../../../components/gestion-candidatos/CandidateCard.vue'
import { createPinia, setActivePinia } from 'pinia'

// Mock de CandidateModal
vi.mock('../../components/gestion-candidatos/addCandidate/CandidateModal.vue', () => ({
  default: {
    template: '<div class="candidate-modal-mock"></div>',
    props: ['candidateData'],
    emits: ['close', 'updated']
  }
}))

// Mock de formatearFecha
vi.mock('../../../utils/dateUtil', () => ({
  formatearFecha: vi.fn(() => 'fecha formateada')
}))

// Mock de vue-i18n
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key
  })
}))

describe('CandidateCard.vue', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const candidateMock = {
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan@test.com',
    phone: '123456789',
    statusId: 's1',
    startWorkDate: '2025-10-17',
    createdAt: '2025-10-17T12:00:00Z',
    updatedAt: '2025-10-17T12:00:00Z'
  }

  // Test 1: Renderiza el nombre truncado y fecha correctamente
  it('Test 1: muestra nombre truncado y fecha formateada', () => {
    const wrapper = mount(CandidateCard, { props: { candidate: candidateMock as any } })
    expect(wrapper.text()).toContain('Juan Pérez')
    expect(wrapper.text()).toContain('fecha formateada')
  })

  // Test 2: Abrir menú al pulsar los tres puntos
  it('Test 2: abre el menú al hacer click en los tres puntos', async () => {
    const wrapper = mount(CandidateCard, { props: { candidate: candidateMock as any } })
    expect(wrapper.find('div.absolute').exists()).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('div.absolute').exists()).toBe(true)
  })

  // Test 3: Abrir modal al pulsar "Modificar" y cerrar menú
  it('Test 3: abre modal y cierra menú al pulsar "Modificar"', async () => {
    const wrapper = mount(CandidateCard, { props: { candidate: candidateMock as any } })
    await wrapper.find('button').trigger('click') // abrir menú
    await wrapper.find('li').trigger('click')    // click modificar
    expect(wrapper.findComponent({ name: 'CandidateModal' }).exists()).toBe(true)
    expect(wrapper.find('div.absolute').exists()).toBe(false) // menú cerrado
  })

})
