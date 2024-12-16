import express from 'express'
import { PrismaClient } from '@prisma/client'
import influencerRoutes from './features/influencers/routes/influencerRoutes'
import employeeRoutes from './features/employee/routes/employeeRoutes'
import cors from 'cors'

export const prisma = new PrismaClient()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }),
)

async function gracefulShutdown(signal: string) {
  console.log(`Received ${signal}. Starting graceful shutdown...`)

  try {
    await prisma.$disconnect()
    console.log('Successfully closed database connection')

    process.exit(0)
  } catch (error) {
    console.error('Error during shutdown:', error)
    process.exit(1)
  }
}

// Handle normal termination
process.on('exit', () => {
  console.log('Exiting application...')
})

// Handle Ctrl+C
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

// Handle system termination requests
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))

app.use('/api/influencers', influencerRoutes)
app.use('/api/employees', employeeRoutes)

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'healthy' })
})
