import { UUID } from '@influencer-management/shared'
import { prisma } from '../../../server'

type CreateEmployeeData = {
  firstName: string
  lastName: string
  email: string
}

//Needed for seeding
export async function createEmployee(data: CreateEmployeeData) {
  return prisma.employee.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    },
  })
}

export async function findEmployeeById(id: UUID) {
  return prisma.employee.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  })
}

export async function findAllEmployees() {
  return prisma.employee.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  })
}
