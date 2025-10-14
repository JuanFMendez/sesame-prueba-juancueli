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
      console.debug("fetchCandidatesByVacancyId - ¿Recuperar candidatos? -> ", this.alreadyLoaded)
      if (this.alreadyLoaded) return

      console.debug("fetchCandidatesByVacancyId - Recuperando candidatos para la vacante", vacancyId)
      const candidateService = new CandidateService()
      this.candidatesAll = await candidateService.getCandidatesByVacancyId(vacancyId)
      this.alreadyLoaded = true
    },
  },


})
