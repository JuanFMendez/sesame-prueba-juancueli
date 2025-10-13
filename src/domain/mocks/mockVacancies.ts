import type { Vacancy } from '../entities/Vacancy'

export const mockVacancies: Vacancy[] = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    companyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Desarrollador Frontend",
    description: "Vacante para desarrollador Vue 3",
    contractType: "Full Time",
    experience: "2 años",
    createdById: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    status: "open",
    openedAt: "2020-01-01T10:00:00+01:00",
    createdAt: "2020-01-01T10:00:00+01:00",
    updatedAt: "2020-01-01T10:00:00+01:00",
    public: true,
    locationVacancy: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      companyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "Madrid",
      createdAt: "2020-01-01T10:00:00+01:00"
    },
    scheduleType: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      companyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "Jornada Completa",
      createdAt: "2020-01-01T10:00:00+01:00"
    },
    category: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      companyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "IT",
      createdAt: "2020-01-01T10:00:00+01:00"
    },
    officeIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    departmentIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
    evaluationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
]
