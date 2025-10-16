import type { Vacancy } from '../entities/Vacancy'
import { axiosInstance } from './axiosInstance'
import type { CandidateStatus } from '../entities/CandidateStatus'

export class VacancyService {

  //obtenemos todas las VACANTES
  async getAllVacancies(): Promise<Vacancy[]> {
    const res = await axiosInstance.get<{ data: Vacancy[] }>('/vacancies')
    return res.data.data
  }

  //obtenemos UNA VACANTE CONCRETA por su ID
  async getVacancyById(id: string): Promise<Vacancy> {
    const res = await axiosInstance.get<{ data: Vacancy }>(`/vacancies/${id}`)
    return res.data.data
  }
  
 //recuperamos posibles estados de los candidatos 
  async getCandidateStatuses(vacancyId: string): Promise<CandidateStatus[]> {
    const res = await axiosInstance.get<{ data: CandidateStatus[] }>(`/candidate-status/${vacancyId}`)
    const allStatuses = res.data.data

    // dentro de todos los estados, usamos solo estos, filtramos.
    const allowedStatuses = ['Nuevo', 'En proceso', 'Seleccionado', 'Descartado']
    return allStatuses.filter(status => allowedStatuses.includes(status.name))
    
  }

}
