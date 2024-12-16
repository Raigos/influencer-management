import { Request, Response } from 'express'
import { findInfluencers } from '../services/influencerService'

export async function getInfluencers(req: Request, res: Response) {
  try {
    // Retrieve optional search filters from the URL query parameters.
    const influencers = await findInfluencers({
      name: req.query.name as string | undefined,
      manager: req.query.manager as string | undefined,
    })

    res.json(influencers)
  } catch (error) {
    console.error('Failed to fetch influencers:', error)
    res.status(500).json({ error: 'Failed to fetch influencers' })
  }
}
