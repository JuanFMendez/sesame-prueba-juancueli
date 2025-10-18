import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { createPinia, setActivePinia } from 'pinia'

import GestionBoard from '../../../components/gestion-candidatos/GestionBoard.vue'

describe('GestionBoard', () => {
  let wrapper: any
  let pinia: ReturnType<typeof createPinia>

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)

    const i18n = createI18n({
      legacy: false,
      locale: 'es',
      messages: {
        es: {
          alert: {
            candidateAdded: 'Candidato agregado correctamente.',
            candidateUpdated: 'Candidato modificado correctamente.'
          }
        }
      }
    })

    wrapper = mount(GestionBoard, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          TabsDisplay: true,
          SearchBar: true,
          AddCandidateButton: true,
          AlertMessage: true,
          TableDisplayVacantes: true,
          TableDisplayCandidatos: true
        }
      }
    })
  })

  // Test 1: Sección activa por defecto es "vacantes"
  it('la sección activa por defecto es "vacantes"', () => {
    expect(wrapper.vm.activeSection).toBe('vacantes')
  })

  // Test 2: Cambiar sección activa al emitir evento de TabsDisplay
  it('cambia la sección activa al emitir evento de TabsDisplay', async () => {
    wrapper.vm.emitSeccionSeleccionada('candidatos')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.activeSection).toBe('candidatos')
  })

  // Test 3: Actualizar texto de búsqueda al emitir evento de SearchBar
  it('actualiza el texto de búsqueda al emitir evento de SearchBar', async () => {
    wrapper.vm.emitBusqueda('Juan')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.searchText).toBe('Juan')
  })

  // Test 4: Mostrar alerta de éxito cuando se agrega un candidato
  it('muestra alerta de éxito al agregar un candidato', async () => {
    wrapper.vm.onCandidateAdded(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.alerta.visible).toBe(true)
    expect(wrapper.vm.alerta.tipo).toBe('success')
    expect(wrapper.vm.alerta.message).toBe('Candidato agregado correctamente.')
  })

  // Test 5: Mostrar alerta de éxito cuando se actualiza un candidato
  it('muestra alerta de éxito al actualizar un candidato', async () => {
    wrapper.vm.onCandidateUpdated(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.alerta.visible).toBe(true)
    expect(wrapper.vm.alerta.tipo).toBe('success')
    expect(wrapper.vm.alerta.message).toBe('Candidato modificado correctamente.')
  })
})
