import { defineStore } from 'pinia'
import { CandidateService } from '../domain/services/CandidateService'
import type { Candidate } from '../domain/entities/Candidate'

export const useCandidateStore = defineStore('candidateStore', {
  state: () => ({
    candidatesAll: [] as Candidate[],
  }),

  actions: {

    // Recuperar candidatos de una vacante siempre actualizando
    async getCandidatesByVacancyId(vacancyId: string) {
      console.debug("getCandidatesByVacancyId - Recuperando candidatos para la vacante", vacancyId)
      const candidateService = new CandidateService()
      this.candidatesAll = await candidateService.getCandidatesByVacancyId(vacancyId)
    },

    // Agregar un nuevo candidato a una vacante
    async addCandidateToVacancy(candidateData: Partial<Candidate>): Promise<Candidate> {
      console.debug("addCandidateToVacancy - Creando candidato para la vacante", candidateData.vacancyId)
      const candidateService = new CandidateService()
      const newCandidate = await candidateService.addCandidateToVacancy(candidateData)
      this.candidatesAll.push(newCandidate) 
      return newCandidate
    },

    // Recuperar un candidato por su id
    async getCandidateById(candidateId: string): Promise<Candidate> {
      console.debug("getCandidateById - Recuperando un candidato", candidateId )
      const candidateService = new CandidateService()
      const candidate = await candidateService.getCandidateById(candidateId)
      return candidate
    },

    // Actualizar un candidato
    async updateCandidate(candidateId: string, candidateData: Partial<Candidate>): Promise<Candidate> {
      console.debug("getCandidateById - Recuperando un candidato", candidateId )
      const candidateService = new CandidateService()
      const updatedCandidate = await candidateService.updateCandidate(candidateId, candidateData)
      return updatedCandidate
    }

  },

})
