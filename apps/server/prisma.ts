import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function connectDB() {
  try {
    await prisma.$connect()
    console.log('Successfully connected to database')
  } catch (error) {
    console.error('Failed to connect to database:', error)
    throw error
  }
}
