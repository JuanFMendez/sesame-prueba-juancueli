import { defineStore } from 'pinia'
import { CandidateService } from '../domain/services/CandidateService'
import type { Candidate } from '../domain/entities/Candidate'

export const useCandidateStore = defineStore('candidateStore', {
  state: () => ({
    candidatesAll: [] as Candidate[],
    alreadyLoaded: false, // indicamos si ya se han recuperado o no los candidatos de la vacante
  }),

  actions: {

    //recuperar candidatos de una vacante
    async fetchCandidatesByVacancyId(vacancyId: string) {
      console.debug("fetchCandidatesByVacancyId - ¿Candidatos ya recuperados con anterioridad? -> ", this.alreadyLoaded)
      if (this.alreadyLoaded) return

      console.debug("fetchCandidatesByVacancyId - Recuperando candidatos para la vacante", vacancyId)
      const candidateService = new CandidateService()
      this.candidatesAll = await candidateService.getCandidatesByVacancyId(vacancyId)
      this.alreadyLoaded = true
    },

    //agregar un nuevo candidato a una vacante
    async addCandidateToVacancy(candidateData: Partial<Candidate>): Promise<Candidate> {
      console.debug("addCandidateToVacancy - Creando candidato para la vacante", candidateData.vacancyId)
      const candidateService = new CandidateService()
      const newCandidate = await candidateService.addCandidateToVacancy(candidateData)
      this.candidatesAll.push(newCandidate) 
      return newCandidate
    },

  },


})
