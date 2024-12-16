import express from 'express'
import { PrismaClient } from '@prisma/client'
import influencerRoutes from './features/influencers/routes/influencerRoutes'
import employeeRoutes from './features/employee/routes/employeeRoutes'
import cors from 'cors'

export const prisma = new PrismaClient()

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

async function startServer() {
  try {
    await prisma.$connect()
    console.log('Successfully connected to database')

    const app = express()
    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000

    // Middleware setup
    app.set('trust proxy', 1)
    app.use(express.json())
    app.use(
      cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
      }),
    )

    // Routes
    app.use('/api/influencers', influencerRoutes)
    app.use('/api/employees', employeeRoutes)

    app.get('/api/health', async (_req, res) => {
      try {
        // Test database connection
        await prisma.$queryRaw`SELECT 1`
        res.status(200).json({ status: 'healthy' })
      } catch (error) {
        console.error('Health check failed:', error)
        res.status(500).json({ status: 'unhealthy', error: 'Database connection failed' })
      }
    })

    // Error handling middleware
    app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.error('Unhandled error:', err)
      res.status(500).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
      })
    })

    // Start server only after all setup is complete
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`)
    })

    // Process handlers
    process.on('exit', () => {
      console.log('Exiting application...')
    })

    process.on('SIGINT', () => gracefulShutdown('SIGINT'))
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
