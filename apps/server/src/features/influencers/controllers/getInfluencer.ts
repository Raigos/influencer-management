import { RequestHandler } from 'express'
import { findInfluencerById } from '../services/influencerService'

export const getInfluencer: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params

    // Validate
    if (!id) {
      res.status(400).json({ error: 'Influencer ID is required' })
      return
    }

    // Attempt to find the influencer by their ID
    const influencer = await findInfluencerById(id)

    // Check if the influencer exists in database
    if (!influencer) {
      res.status(404).json({ error: 'Influencer not found' })
      return // Just return without a value
    }

    res.json(influencer)
  } catch (error) {
    console.error('Failed to fetch influencer:', error)
    res.status(500).json({ error: 'Failed to fetch influencer' })
  }
}
