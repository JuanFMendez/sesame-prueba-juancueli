import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TabsDisplay from '../../../components/gestion-candidatos/TabsDisplay.vue'

describe('TabsDisplay.vue', () => {

  // 1 Renderiza correctamente las dos pestañas
  it('muestra las pestañas "Vacantes" y "Candidatos"', () => {
    const wrapper = mount(TabsDisplay)
    const buttons = wrapper.findAll('button')

    expect(buttons.length).toBe(2)
    expect(buttons[0]?.text()).toBe('Vacantes')
    expect(buttons[1]?.text()).toBe('Candidatos')
  })

  // 2 "Vacantes" está activa por defecto
  it('activa la pestaña "Vacantes" al inicio', () => {
    const wrapper = mount(TabsDisplay)
    const buttons = wrapper.findAll('button')
    const vacantesButton = buttons[0]

    expect(vacantesButton?.classes()).toContain('text-lila')
  })

  // 3 Cambia a "Candidatos" al hacer clic
  it('activa "Candidatos" al hacer clic', async () => {
    const wrapper = mount(TabsDisplay)
    const buttons = wrapper.findAll('button')
    const candidatosButton = buttons[1]

    expect(candidatosButton).toBeDefined()
    await candidatosButton?.trigger('click')

    expect(candidatosButton?.classes()).toContain('text-lila')
  })

  // 4 Emite el evento con la pestaña seleccionada
  it('emite el evento con el nombre de la pestaña seleccionada', async () => {
    const wrapper = mount(TabsDisplay)
    const buttons = wrapper.findAll('button')
    const candidatosButton = buttons[1]

    await candidatosButton?.trigger('click')

    const emitted = wrapper.emitted('seccionSelected')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toBe('candidatos')
  })

})
