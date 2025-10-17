import { setActivePinia, createPinia } from 'pinia'
import { useVacancyStore } from '../../store/vacancyStore'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock completo del VacancyService
vi.mock('../../infra/services/VacancyService', () => {
  return {
    VacancyService: vi.fn().mockImplementation(() => ({
      getAllVacancies: vi.fn().mockResolvedValue([
        {
          id: '1',
          companyId: 'C1',
          name: 'Vacante 1',
          description: 'Descripción 1',
          contractType: 'Full-time',
          experience: '2 años',
          createdById: 'admin',
          status: 'open',
          openedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          evaluationId: 'E1'
        },
        {
          id: '2',
          companyId: 'C2',
          name: 'Vacante 2',
          description: 'Descripción 2',
          contractType: 'Part-time',
          experience: '1 año',
          createdById: 'admin',
          status: 'open',
          openedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          evaluationId: 'E2'
        }
      ]),
      getVacancyById: vi.fn((id: string) =>
        Promise.resolve({
          id,
          companyId: 'C1',
          name: `Vacante ${id}`,
          description: `Descripción ${id}`,
          contractType: 'Full-time',
          experience: '2 años',
          createdById: 'admin',
          status: 'open',
          openedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          evaluationId: `E${id}`
        })
      )
    }))
  }
})

describe('Vacancy Store', () => {
  let store: ReturnType<typeof useVacancyStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useVacancyStore()
  })

  // Test 1: El store inicia con vacantes vacías
  it('inicia con vacantes vacías', () => {
    expect(store.vacanciesAll).toEqual([])
    expect(store.vacancyOne).toBeNull()
  })

  // Test 2: fetchAllVacancies llena vacanciesAll
  it('fetchAllVacancies llena vacanciesAll', async () => {
    await store.fetchAllVacancies()
    expect(store.vacanciesAll).toHaveLength(2)
    expect(store.vacanciesAll[0]?.name).toBe('Vacante 1')
    expect(store.vacanciesAll[1]?.name).toBe('Vacante 2')
  })

  // Test 3: fetchVacancyById llena vacancyOne
  it('fetchVacancyById llena vacancyOne', async () => {
    await store.fetchVacancyById('1')
    expect(store.vacancyOne).not.toBeNull()
    expect(store.vacancyOne?.id).toBe('1')
    expect(store.vacancyOne?.name).toBe('Vacante 1')
  })
})
