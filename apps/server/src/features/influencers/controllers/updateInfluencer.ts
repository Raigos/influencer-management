import { RequestHandler } from 'express'
import { findInfluencerById, updateInfluencer } from '../services/influencerService'
import { InfluencerUpdateData } from '../types'
import { isValidName, nameValidationErrors } from '@influencer-management/shared'

export const updateInfluencerHandler: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    // First check if  exists
    const existingInfluencer = await findInfluencerById(id)
    if (!existingInfluencer) {
      res.status(404).json({ error: 'Influencer not found' })
      return
    }

    const filteredData: InfluencerUpdateData = {}

    // Validate firstName
    if ('firstName' in updateData) {
      if (!isValidName(updateData.firstName)) {
        res.status(400).json({
          error: 'Invalid first name',
          message: nameValidationErrors.INVALID_FIRST_NAME,
        })
        return
      }
      filteredData.firstName = updateData.firstName.trim()
    }

    // Validate lastName
    if ('lastName' in updateData) {
      if (!isValidName(updateData.lastName)) {
        res.status(400).json({
          error: 'Invalid last name',
          message: nameValidationErrors.INVALID_LAST_NAME,
        })
        return
      }
      filteredData.lastName = updateData.lastName.trim()
    }

    // Ensure at least one valid field was provided for update
    if (Object.keys(filteredData).length === 0) {
      res.status(400).json({
        error: 'No valid fields to update provided',
        message: 'Only firstName and lastName can be updated through this endpoint',
        validFields: ['firstName', 'lastName'],
      })
      return
    }

    const updatedInfluencer = await updateInfluencer(id, filteredData)
    res.json(updatedInfluencer)
  } catch (error) {
    console.error('Failed to update influencer:', error)
    res.status(500).json({ error: 'Failed to update influencer' })
  }
}
