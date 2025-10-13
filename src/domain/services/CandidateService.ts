import { axiosInstance } from './axiosInstance'
import type { Candidate } from '../entities/Candidate'

export class CandidateService {

  //obtenemos los CANDIDATOS de UNA VACANTE 
  async getCandidatesByVacancyId(vacancyId: string): Promise<Candidate[]> {
    const res = await axiosInstance.get<{ data: Candidate[] }>(`/vacancies/${vacancyId}/candidates`)
    return res.data.data
  }

}
