import { Router } from 'express'
const router = Router()
import * as beansCtrl from '../controllers/beans.js'
import { isLoggedIn } from '../middleware/middleware.js'

// GET - localhost:3000/profile
router.get('/', isLoggedIn, beansCtrl.profileIndex)

export {
  router
}