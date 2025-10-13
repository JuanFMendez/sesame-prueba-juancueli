export interface LocationVacancy {
  id: string
  companyId: string
  name: string
  createdAt: string
}

export interface ScheduleType {
  id: string
  companyId: string
  name: string
  createdAt: string
}

export interface Category {
  id: string
  companyId: string
  name: string
  createdAt: string
}

export interface Vacancy {
  id: string
  companyId: string
  name: string
  description: string
  contractType: string
  experience: string
  createdById: string
  status: string
  openedAt: string
  createdAt: string
  updatedAt: string
  public: boolean
  locationVacancy: LocationVacancy
  scheduleType: ScheduleType
  category: Category
  officeIds: string[]
  departmentIds: string[]
  evaluationId: string
}
