import { RequestHandler } from 'express'
import { findInfluencerById, updateInfluencer } from '../services/influencerService'
import { findEmployeeById } from '../../employee/services/employeeService'

export const assignManagerHandler: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const { managerId } = req.body

    // Check if the influencer exists
    const existingInfluencer = await findInfluencerById(id)
    if (!existingInfluencer) {
      res.status(404).json({ error: 'Influencer not found' })
      return
    }

    // Verify the employee exists
    if (managerId) {
      const employee = await findEmployeeById(managerId)
      if (!employee) {
        res.status(400).json({ error: 'Manager not found' })
        return
      }
    }

    if (existingInfluencer.managerId === managerId) {
      res.json(existingInfluencer)
      return
    }
    const updatedInfluencer = await updateInfluencer(id, { managerId })
    res.json(updatedInfluencer)
  } catch (error) {
    console.error('Failed to assign manager:', error)
    res.status(500).json({ error: 'Failed to assign manager' })
  }
}
