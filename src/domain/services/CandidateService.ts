import { axiosInstance } from './axiosInstance'
import type { Candidate } from '../entities/Candidate'
import type { CandidateStatus } from '../entities/CandidateStatus'

export class CandidateService {

  //obtenemos los CANDIDATOS de UNA VACANTE 
  async getCandidatesByVacancyId(vacancyId: string): Promise<Candidate[]> {
    const res = await axiosInstance.get<{ data: Candidate[] }>(`/vacancies/${vacancyId}/candidates`)
    return res.data.data
  }

 //recuperamos posibles estados de los candidatos
  async getCandidateStatuses(vacancyId: string): Promise<CandidateStatus[]> {
    const res = await axiosInstance.get<{ data: CandidateStatus[] }>(`/candidate-status/${vacancyId}`)
    return res.data.data
  }

  //agregamos NUEVO CANDIDATO 
  async addCandidateToVacancy(candidate: Partial<Candidate>): Promise<Candidate> {
    const res = await axiosInstance.post<{ data: Candidate }>(`/candidates`, candidate)
    return res.data.data
  }

}
