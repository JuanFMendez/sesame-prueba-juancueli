export interface Candidate {
  id: string                   
  firstName: string
  lastName: string
  email: string
  phone: string
  linkedInURL: string
  desiredSalary: string
  startWorkDate: string
  web: string
  location: string
  vacancyId: string
  statusId: string
  address?: string            
  comment?: string             
  appliedAt: string
  type?: string               
  hasDocument?: boolean
  imageProfileURL?: string
  evaluation?: number
  threadId?: string
  lastComment?: any
  numComments?: number
  createdAt?: string
  updatedAt?: string
  employeeId?: string
  vacancy?: {
    id: string
    name: string
    companyId: string
    status: string
  }
  status?: {
    id: string
    name: string
    companyId: string
    order?: number
    createdAt?: string
    updatedAt?: string
    vacancyId?: string
  }
}
