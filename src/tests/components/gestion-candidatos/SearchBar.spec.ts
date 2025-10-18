import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

import SearchBar from '../../../components/gestion-candidatos/SearchBar.vue'

describe('SearchBar', () => {
  let wrapper: any

  beforeEach(() => {
    const i18n = createI18n({
      legacy: false,
      locale: 'es',
      messages: {
        es: {
          search: {
            placeholder: 'Buscar...',
            vacanciesTooltip: 'Buscar por ID, nombre, descripción, estado o tipo de contrato',
            candidatesTooltip: 'Buscar candidatos por nombre, apellido ,email ó estado.'
          }
        }
      }
    })

    wrapper = mount(SearchBar, {
      global: {
        plugins: [i18n]
      },
      props: {
        seccionActiva: 'vacantes'
      }
    })
  })

  // Test 1: Emitir evento "search" al escribir en el input
  it('emite evento "search" al escribir en el input', async () => {
    const input = wrapper.find('input')
    await input.setValue('Juan')
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')![0]).toEqual(['Juan']) // Primer evento emitido con valor 'Juan'
  })

  // Test 2: Emitir evento "search" vacío al limpiar el input
 it('emite evento "search" vacío al hacer click en la X', async () => {
  const input = wrapper.find('input')
  await input.setValue('Texto')

  // Buscar el botón X por clase
  const clearButton = wrapper.find('svg.cursor-pointer')
  expect(clearButton.exists()).toBe(true) // asegurar que se encontró
  await clearButton.trigger('click')      // click en la X
  expect(wrapper.vm.searchText).toBe('')                   // input vacío
  expect(wrapper.emitted('search')![1]).toEqual([''])      // Segundo evento emitido con valor ''
})

  // Test 3: Computed tooltip cambia según la sección activa
  it('tooltip cambia según la sección activa', async () => {
    expect(wrapper.vm.tooltipText).toBe(
      'Buscar por ID, nombre, descripción, estado o tipo de contrato'
    )

    await wrapper.setProps({ seccionActiva: 'candidatos' })
    expect(wrapper.vm.tooltipText).toBe(
      'Buscar candidatos por nombre, apellido ,email ó estado.'
    )
  })
})
