import { defineStore } from 'pinia'
import { VacancyService } from '../domain/services/VacancyService'
import type { Vacancy } from '../domain/entities/Vacancy';

export const useVacancyStore = defineStore('vacancyStore', {
  state: () => ({
    vacanciesAll: [] as Vacancy[],
    vacancyOne: null as Vacancy | null,
    alreadyLoaded: false, //indicamos si ya se han recuperado o no todas las vacantes
  }),
  actions: {

    // peticion para almacenar todas las vacantes
    async fetchAllVacancies() {      
        console.debug("fetchAllVacancies - ¿Recuperar todas las vacantes? -> ", this.alreadyLoaded);
        if (this.alreadyLoaded) return

        console.debug("fetchAllVacancies - Recuperando todas las vacantes...");
        const vacancyService = new VacancyService()
        this.vacanciesAll = await vacancyService.getAllVacancies()
        this.alreadyLoaded = true

    },

    // peticion ppara recargar todas las vacantes 
    async forceReloadAll() {
        console.debug("forceReloadAll - Recargando todas las vacantes...");
        const vacancyService = new VacancyService()
        this.vacanciesAll = await vacancyService.getAllVacancies()
        this.alreadyLoaded = true
    },

    // get una unica vacante especifica 
    async fetchVacancyById(vacancyId: string) {
        console.debug("fetchVacancyById - Recuperando una unica vacante por id -> ", vacancyId);
        const vacancyService = new VacancyService()
        this.vacancyOne = await vacancyService.getVacancyById(vacancyId)
    },

  }
})
