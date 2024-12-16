import { Router } from 'express'

import { createInfluencerHandler } from '../controllers/createInfluencer'
import { getInfluencer } from '../controllers/getInfluencer'
import { getInfluencers } from '../controllers/getInfluencers'
import { updateInfluencerHandler } from '../controllers/updateInfluencer'
import { deleteInfluencerHandler } from '../controllers/deleteInfluencer'
import { assignManagerHandler } from '../controllers/managerService'
import { removeManagerHandler } from '../controllers/removeManager'

const router: Router = Router()

//Create influencer
router.post('/', createInfluencerHandler)

//Get single influencer
router.get('/:id', getInfluencer)

//Get all influencers
router.get('/', getInfluencers)

//Update influencer data
router.patch('/:id', updateInfluencerHandler)

//Delete influencer
router.delete('/:id', deleteInfluencerHandler)

router.patch('/:id/manager', assignManagerHandler)

router.delete('/:id/manager', removeManagerHandler)

export default router
