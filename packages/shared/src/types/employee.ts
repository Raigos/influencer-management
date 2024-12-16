import { UUID } from '../types/common'

export interface Employee {
  id: UUID
  firstName: string
  lastName: string
  email: string
  createdAt: Date
  updatedAt: Date
}
