import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CandidateCard from '../../components/CandidateCard.vue'
import { formatearFecha } from '../../utils/dateUtil'

// Mock de CandidateModal para no renderizarlo realmente
vi.mock('../../components/gestion-candidatos/addCandidate/CandidateModal.vue', () => ({
  default: {
    template: '<div class="candidate-modal-mock"></div>',
    props: ['candidateData'],
    emits: ['close', 'updated']
  }
}))

// Mock de formatearFecha
vi.mock('../../utils/dateUtil', () => ({
  formatearFecha: vi.fn((date: string) => 'fecha formateada')
}))

describe('CandidateCard.vue', () => {

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
    const wrapper = mount(CandidateCard, {
      props: { candidate: candidateMock as any } // evitamos error de tipo
    })

    expect(wrapper.text()).toContain('Juan Pérez')
    expect(wrapper.text()).toContain('fecha formateada')
    expect(formatearFecha).toHaveBeenCalledWith(candidateMock.createdAt)
  })

  // Test 2: Abrir menú al pulsar los tres puntos
  it('Test 2: abre el menú al hacer click en los tres puntos', async () => {
    const wrapper = mount(CandidateCard, {
      props: { candidate: candidateMock as any }
    })

    expect(wrapper.vm.menuOpen).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(wrapper.vm.menuOpen).toBe(true)
  })

  // Test 3: Abrir modal al pulsar "Modificar" y cerrar menú
  it('Test 3: abre modal y cierra menú al pulsar "Modificar"', async () => {
    const wrapper = mount(CandidateCard, {
      props: { candidate: candidateMock as any }
    })

    await wrapper.find('button').trigger('click') // abrimos menú
    const modificarOption = wrapper.find('li')
    await modificarOption.trigger('click')

    expect(wrapper.vm.modalVisible).toBe(true)
    expect(wrapper.vm.menuOpen).toBe(false)
    expect(wrapper.vm.candidatoSeleccionado).toEqual(candidateMock)
  })

})
