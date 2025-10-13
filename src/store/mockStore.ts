import { defineStore } from 'pinia'
import type { Vacancy } from '../domain/entities/Vacancy'
import type { Candidate } from '../domain/entities/Candidate'
import { mockVacancies } from '../domain/mocks/mockVacancies'
import { mockCandidates } from '../domain/mocks/mocksCandidates'

//TODO : PENDIENTE ELIMINAR -> MOCK STORE para pruebas sin backend.
export const useMockStore = defineStore('mockStore', {
  state: () => ({
    vacancies: [] as Vacancy[],
    candidates: [] as Candidate[],
  }),
  getters: {
    candidatesByVacancy: (state) => {
      return (vacancyId: string) =>
        state.candidates.filter(c => c.vacancyId === vacancyId)
    }
  },
  actions: {
    loadMocks() {
      this.vacancies = mockVacancies
      this.candidates = mockCandidates
    },
  }
})
