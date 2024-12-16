import { findInfluencerById, updateInfluencer } from '../services/influencerService'
import { RequestHandler } from 'express'

export const removeManagerHandler: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params

    // Check if the influencer exists
    const existingInfluencer = await findInfluencerById(id)

    if (!existingInfluencer) {
      res.status(404).json({ error: 'Influencer not found' })
      return
    }

    // If influencer doesn't have a manager, no need to remove
    if (!existingInfluencer.managerId) {
      res.json(existingInfluencer)
      return
    }

    const updatedInfluencer = await updateInfluencer(id, { managerId: null })
    res.json(updatedInfluencer)
  } catch (error) {
    console.error('Failed to remove manager:', error)
    res.status(500).json({ error: 'Failed to remove manager' })
  }
}
