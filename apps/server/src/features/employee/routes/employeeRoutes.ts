import { Router } from 'express'
import { getEmployees } from '../controllers/getEmployees'

const router: Router = Router()

//Get all employees
router.get('/', getEmployees)

export default router
