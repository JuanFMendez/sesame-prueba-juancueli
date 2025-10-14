import { defineStore } from 'pinia'
import { VacancyService } from '../domain/services/VacancyService'
import type { Vacancy } from '../domain/entities/Vacancy';

export const useVacancyStore = defineStore('vacancyStore', {
  state: () => ({
    vacanciesAll: [] as Vacancy[],
    vacancyOne: null as Vacancy | null,
    loadedAll: false,
  }),
  actions: {

    // peticion para almacenar todas las vacantes
    async fetchAllVacancies() {
      
        console.debug("fetchAllVacancies - ¿Recuperar todas las vacantes? -> ", this.loadedAll);
        if (this.loadedAll) return
        console.debug("fetchAllVacancies - Recuperando todas las vacantes...");
        const service = new VacancyService()
        this.vacanciesAll = await service.getAllVacancies()
        this.loadedAll = true

    },

    // peticion ppara recargar todas las vacantes 
    async forceReloadAll() {
        console.debug("forceReloadAll - Recargando todas las vacantes...");
        const service = new VacancyService()
        this.vacanciesAll = await service.getAllVacancies()
        this.loadedAll = true
    },

    // get una unica vacante especifica 
    async fetchVacancyById(vacancyId: string) {
        console.debug("fetchVacancyById - Recuperando una unica vacante por id -> ", vacancyId);
        const service = new VacancyService()
        this.vacancyOne = await service.getVacancyById(vacancyId)
    },

  }
})
