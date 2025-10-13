import type { Vacancy } from '../entities/Vacancy'
import { axiosInstance } from './axiosInstance'

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
  
}
