import { config } from '@vue/test-utils';
import { vi } from 'vitest';

// Configuración global para los tests
config.global.mocks = {
  // Aquí puedes agregar mocks globales si los necesitas
};

// Mock de console.error para tests
console.error = vi.fn();

// Mock de console.warn para tests
console.warn = vi.fn();