import { RequestHandler } from 'express'
import { deleteInfluencer, findInfluencerById } from '../services/influencerService'

export const deleteInfluencerHandler: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params

    // Check if the influencer exists
    const existingInfluencer = await findInfluencerById(id)
    if (!existingInfluencer) {
      res.status(404).json({ error: 'Influencer not found' })
      return
    }

    await deleteInfluencer(id)
    res.status(204).send()
  } catch (error) {
    console.error('Failed to delete influencer:', error)
    res.status(500).json({ error: 'Failed to delete influencer' })
  }
}
