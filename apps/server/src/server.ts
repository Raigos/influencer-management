import express from 'express'
import { PrismaClient } from '@prisma/client'
import influencerRoutes from './features/influencers/routes/influencerRoutes'
import employeeRoutes from './features/employee/routes/employeeRoutes'
import cors from 'cors'

export const prisma = new PrismaClient()

prisma
  .$connect()
  .then(() => {
    console.log('Successfully connected to database')
  })
  .catch(error => {
    console.error('Failed to connect to database:', error)
    process.exit(1)
  })

const app = express()

app.set('trust proxy', 1)

app.use(express.json())

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`)
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

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  })
})
