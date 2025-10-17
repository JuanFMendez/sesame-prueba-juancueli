import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SidebarMenu from '../../components/SidebarMenu.vue'

describe('SidebarMenu.vue', () => {

  // Test 1: Renderiza correctamente el logo y el título de primer nivel
  it('renderiza el logo y el título de primer nivel', () => {
    const wrapper = mount(SidebarMenu)

    // comprueba que se renderiza el logo
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)

    // comprueba que el texto de nivel 1 (ADMINISTRADOR) aparece
    expect(wrapper.text()).toContain('ADMINISTRADOR')
  })

  // Test 2: Expande y colapsa el primer nivel al hacer clic
  it('abre y cierra el primer nivel al hacer clic', async () => {
    const wrapper = mount(SidebarMenu)

    const niveles1 = wrapper.findAll('div.cursor-pointer.text-gray-600')
    const nivel1 = niveles1[0] 
    expect(nivel1).toBeTruthy()

    // Cierra el primer nivel (al inicio open=true)
    await nivel1?.trigger('click')

    const menuData = (wrapper.vm as any).menu[0]
    expect(menuData.open).toBe(false)
  })

  // Test 3: Emite evento "selectItem" al seleccionar un item de nivel 3
  it('emite el evento selectItem al seleccionar un nivel 3', async () => {
    const wrapper = mount(SidebarMenu)

    // aseguramos que el nivel 2 esté abierto para que el nivel 3 exista
    const menuData = (wrapper.vm as any).menu
    menuData[0].children[0].open = true
    await wrapper.vm.$nextTick()

    // buscamos el primer nivel 3
    const niveles3 = wrapper.findAll('div.cursor-pointer.font-bold')
    const nivel3 = niveles3[0] 
    expect(nivel3).toBeTruthy() // verificamos que existe

    await nivel3?.trigger('click')

    // comprobamos que emitió el evento correctamente
    const emitted = wrapper.emitted('selectItem')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toBe('Reclutamiento')
  })

  // Test 4: Solo un item de nivel 3 puede estar activo a la vez
  it('solo un item de nivel 3 está activo al seleccionar', async () => {
    const wrapper = mount(SidebarMenu)

    const menuData = (wrapper.vm as any).menu

    // agregamos un segundo nivel 3 para probar
    menuData[0].children[0].children.push({ title: 'Entrevistas', active: false })

    // seleccionamos el segundo item
    await wrapper.vm.selectItem(menuData[0].children[0].children[1])

    // comprobamos que solo ese está activo
    expect(menuData[0].children[0].children[1].active).toBe(true)
    expect(menuData[0].children[0].children[0].active).toBe(false)
  })

})
