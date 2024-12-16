import { RequestHandler } from 'express'
import { findAllEmployees } from '../services/employeeService'

export const getEmployees: RequestHandler = async (_req, res) => {
  try {
    const employees = await findAllEmployees()

    res.json(employees)
  } catch (error) {
    console.error('Failed to fetch employees:', error)
    res.status(500).json({ error: 'Failed to fetch employees' })
  }
}
