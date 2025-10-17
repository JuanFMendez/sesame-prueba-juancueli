import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCandidateStore } from '../../store/candidateStore'
import { CandidateService } from '../../infra/services/CandidateService'
import type { Candidate } from '../../domain/entities/Candidate'

// Mock del servicio
vi.mock('../../infra/services/CandidateService')

// Helper para crear candidatos de prueba
function createMockCandidate(overrides: Partial<Candidate> = {}): Candidate {
  return {
    id: '0',
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'test@example.com',
    phone: '000000000',
    linkedInURL: 'https://linkedin.com/in/test',
    desiredSalary: '50000',
    startWorkDate: new Date().toISOString(),
    web: 'https://example.com',
    location: 'Ciudad',
    vacancyId: 'A',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    statusId: '1',
    appliedAt: new Date().toISOString(),
    status: undefined,
    ...overrides
  }
}

describe('Candidate Store', () => {
  let store: ReturnType<typeof useCandidateStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useCandidateStore()
    vi.clearAllMocks()
  })


  // Test 1: Recuperar candidatos por vacante y guardarlos en el store
  it('recupera candidatos por vacante y los guarda en el store', async () => {
    const mockCandidates: Candidate[] = [
      createMockCandidate({ id: '1', firstName: 'Juan', lastName: 'Pérez', email: 'juan@test.com' }),
      createMockCandidate({ id: '2', firstName: 'Ana', lastName: 'García', email: 'ana@test.com' })
    ]

    ;(CandidateService as any).mockImplementation(() => ({
      getCandidatesByVacancyId: vi.fn().mockResolvedValue(mockCandidates)
    }))

    await store.getCandidatesByVacancyId('A')
    expect(store.candidatesAll).toEqual(mockCandidates)
  })

  // Test 2: Añadir un nuevo candidato correctamente al store
  it('añade un nuevo candidato correctamente', async () => {
    const mockCandidate = createMockCandidate({ id: '3', firstName: 'Luis', lastName: 'Martín', email: 'luis@test.com', vacancyId: 'B' })

    ;(CandidateService as any).mockImplementation(() => ({
      addCandidateToVacancy: vi.fn().mockResolvedValue(mockCandidate)
    }))

    const result = await store.addCandidateToVacancy(mockCandidate)
    expect(result).toEqual(mockCandidate)
    expect(store.candidatesAll).toContainEqual(mockCandidate)
  })

  // Test 3: Recuperar un candidato por su ID
  it('recupera un candidato por ID', async () => {
    const mockCandidate = createMockCandidate({ id: '10', firstName: 'Sara', lastName: 'López', email: 'sara@test.com', vacancyId: 'C' })

    ;(CandidateService as any).mockImplementation(() => ({
      getCandidateById: vi.fn().mockResolvedValue(mockCandidate)
    }))

    const result = await store.getCandidateById('10')
    expect(result).toEqual(mockCandidate)
  })

  // Test 4: Actualizar un candidato existente en el store
  it('actualiza un candidato existente en el store', async () => {
    store.candidatesAll = [
      createMockCandidate({ id: '20', firstName: 'Carlos', lastName: 'Ruiz', email: 'carlos@test.com', vacancyId: 'D' })
    ]

    const updatedCandidate = {
      ...store.candidatesAll[0],
      lastName: 'Gómez',
      updatedAt: new Date().toISOString()
    }

    ;(CandidateService as any).mockImplementation(() => ({
      updateCandidate: vi.fn().mockResolvedValue(updatedCandidate)
    }))

    const result = await store.updateCandidate('20', updatedCandidate)
    expect(result).toEqual(updatedCandidate)

    expect(store.candidatesAll[0]?.lastName).toBe('Gómez')
  })
})
