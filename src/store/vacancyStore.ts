import { defineStore } from 'pinia'
import { VacancyService } from '../domain/services/VacancyService'
import type { Vacancy } from '../domain/entities/Vacancy';

export const useVacancyStore = defineStore('vacancyStore', {
  state: () => ({
    vacanciesAll: [] as Vacancy[],
    vacancyOne: null as Vacancy | null,
    
  }),
  actions: {

    // peticion para recuperar todas las vacantes
    async fetchAllVacancies() {      
        console.debug("fetchAllVacancies - Recuperando todas las vacantes...");
        const vacancyService = new VacancyService()
        this.vacanciesAll = await vacancyService.getAllVacancies()
    },

    // get una unica vacante especifica 
    async fetchVacancyById(vacancyId: string) {
        console.debug("fetchVacancyById - Recuperando una unica vacante por id -> ", vacancyId);
        const vacancyService = new VacancyService()
        this.vacancyOne = await vacancyService.getVacancyById(vacancyId)
    },

  }
})
