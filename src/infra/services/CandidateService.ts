import { axiosInstance } from '../../infra/axiosInstance'
import type { Candidate } from '../../domain/entities/Candidate'

export class CandidateService {

  //obtenemos los CANDIDATOS de UNA VACANTE 
  async getCandidatesByVacancyId(vacancyId: string): Promise<Candidate[]> {
    const res = await axiosInstance.get<{ data: Candidate[] }>(`/vacancies/${vacancyId}/candidates`)
    return res.data.data
  }

  //agregamos NUEVO CANDIDATO 
  async addCandidateToVacancy(candidate: Partial<Candidate>): Promise<Candidate> {
    const res = await axiosInstance.post<{ data: Candidate }>(`/candidates`, candidate)
    return res.data.data
  }

  // Recuperar UN CANDIDATO por ID
  async getCandidateById(candidateId: string): Promise<Candidate> {
    const res = await axiosInstance.get<{ data: Candidate }>(`/candidates/${candidateId}`)
    return res.data.data
  }

  // actualizar UN CANDIDATO
  async updateCandidate(candidateId: string, candidateData: Partial<Candidate>): Promise<Candidate> {
    const res = await axiosInstance.put<{ data: Candidate }>(`/candidates/${candidateId}`, candidateData)
    return res.data.data
  }


}
