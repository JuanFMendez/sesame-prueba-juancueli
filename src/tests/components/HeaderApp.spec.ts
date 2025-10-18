import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HeaderApp from '../../components/HeaderApp.vue'

// Mock de la imagen importada para evitar errores con assets
vi.mock('../../assets/logo-perfil.png', () => ({
  default: 'mocked-logo-path.png'
}))

// Mock de LanguageSelect para evitar uso de vue-i18n
vi.mock('../../components/LanguageSelect.vue', () => ({
  default: {
    template: '<div class="language-select-mock"></div>'
  }
}))

describe('HeaderApp.vue', () => {

  // Test 1: Renderiza el título recibido por props
  it('muestra el título recibido por props', () => {
    const wrapper = mount(HeaderApp, {
      props: { titulo: 'Gestión de Candidatos' }
    })
    const titulo = wrapper.find('h1')
    expect(titulo.exists()).toBe(true)
    expect(titulo.text()).toBe('Gestión de Candidatos')
  })

  // Test 2: Renderiza la imagen de perfil correctamente
  it('renderiza la imagen del perfil correctamente', () => {
    const wrapper = mount(HeaderApp, {
      props: { titulo: 'Dashboard' }
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('mocked-logo-path.png')
    expect(img.attributes('alt')).toBe('perfil')
  })

  // Test 3: Aplica las clases de estilo esperadas en el header
  it('tiene las clases de estilo esperadas', () => {
    const wrapper = mount(HeaderApp, {
      props: { titulo: 'Dashboard' }
    })
    const header = wrapper.find('header')
    expect(header.classes()).toContain('w-full')
    expect(header.classes()).toContain('flex')
    expect(header.classes()).toContain('justify-between')
  })

})
