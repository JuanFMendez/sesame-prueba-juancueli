import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AlertMessage from '../../components/AlertMessage.vue'

describe('AlertMessage.vue', () => {

  // Test 1: Renderiza correctamente el mensaje recibido por props
  it('Test 1: muestra el mensaje recibido por props', () => {
    const wrapper = mount(AlertMessage, {
      props: {
        message: 'Operación exitosa'
      }
    })

    expect(wrapper.text()).toContain('Operación exitosa')
  })


  // Test 2: Aplica clases verdes cuando el tipo es "success"
  it('Test 2: usa clases verdes cuando el tipo es success', () => {
    const wrapper = mount(AlertMessage, {
      props: {
        message: 'Todo bien',
        tipo: 'success'
      }
    })

    const div = wrapper.find('[role="alert"]')
    expect(div.classes()).toContain('bg-green-100')
    expect(div.classes()).toContain('border-green-400')
    expect(div.classes()).toContain('text-green-700')
  })


  // Test 3: Aplica clases rojas cuando el tipo es "error"
  it('Test 3: usa clases rojas cuando el tipo es error', () => {
    const wrapper = mount(AlertMessage, {
      props: {
        message: 'Ha ocurrido un error',
        tipo: 'error'
      }
    })

    const div = wrapper.find('[role="alert"]')
    expect(div.classes()).toContain('bg-red-100')
    expect(div.classes()).toContain('border-red-400')
    expect(div.classes()).toContain('text-red-700')
  })


  // Test 4: Oculta la alerta al pulsar el botón de cierre
  it('Test 4: se oculta al pulsar el botón de cerrar', async () => {
    const wrapper = mount(AlertMessage, {
      props: {
        message: 'Cierra esta alerta'
      }
    })

    // Comprobamos que la alerta es visible al inicio
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)

    // Simulamos clic en botón de cierre
    await wrapper.find('button').trigger('click')

    // La alerta ya no debe estar visible
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

})
