import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import AddCandidateButton from '../../../../components/gestion-candidatos/addCandidate/AddCandidateButton.vue';
import CandidateModal from '../../../../components/gestion-candidatos/addCandidate/CandidateModal.vue';

describe('AddCandidateButton', () => {

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  // Test 1: Comprobar que el botón se renderiza correctamente
  it('renderiza el botón', () => {
    const wrapper = mount(AddCandidateButton); 
    const button = wrapper.find('button');          // Buscamos el botón
    expect(button.exists()).toBe(true);             // Comprobamos que existe
    expect(button.text()).toBe('Añadir candidato'); // Comprobamos el texto
  });

  // Test 2: Abrir el modal al hacer click en el botón
  it('abre el modal al hacer click en el botón', async () => {
    const wrapper = mount(AddCandidateButton);
    const button = wrapper.find('button');
    await button.trigger('click');                                      // click en el botón
    expect(wrapper.findComponent(CandidateModal).exists()).toBe(true); // Comprobamos que el modal se muestra
  });

  // Test 3: Emitir evento "added" y cerrar el modal cuando el CandidateModal emite "added"
  it('emite evento "added" y cierra el modal cuando CandidateModal emite "added"', async () => {
    const wrapper = mount(AddCandidateButton);

    // Abrimos el modal simulando click en el botón
    await wrapper.find('button').trigger('click');
    
    // Obtenemos el componente del modal
    const modal = wrapper.findComponent(CandidateModal);
    
    // Emitimos el evento "added" desde el modal con un candidato falso
    const fakeCandidate = { id: 1, name: 'Juan Cueli' };
    await modal.vm.$emit('added', fakeCandidate);
    
    // Comprobamos que el componente padre emite el evento "added" con los datos correctos
    expect(wrapper.emitted('added')).toBeTruthy();
    expect(wrapper.emitted('added')![0]).toEqual([fakeCandidate]);
    
    // Comprobamos que el modal se cerró después de emitir el evento
    expect(wrapper.vm.showModal).toBe(false);
  });

});
