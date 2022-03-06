import { Router } from 'express'
const router = Router()
import * as beansCtrl from '../controllers/beans.js'
import { isLoggedIn } from '../middleware/middleware.js'

// GET localhost:3000/
router.get('/', beansCtrl.index)
// POST localhost:3000/
router.post('/', isLoggedIn, beansCtrl.create)
// GET localhost:3000/beans/:id
router.get('/:id', beansCtrl.show)
// POST localhost:3000/beans/:id
router.post('/:id', isLoggedIn, beansCtrl.createReview)

export {
  router
}