import { Router } from 'express'
const router = Router()
import * as beansCtrl from '../controllers/beans.js'
import { isLoggedIn } from '../middleware/middleware.js'

// GET localhost:3000/
router.get('/', beansCtrl.index)
// GET localhost:3000/beans/:id
router.get('/:id', beansCtrl.show)
// POST localhost:3000/
router.post('/', isLoggedIn, beansCtrl.create)
// POST localhost:3000/beans/:id
router.post('/:id', isLoggedIn, beansCtrl.createReview)
// GET localhost:3000/beans/:id/edit
router.get('/:id/edit', isLoggedIn, beansCtrl.edit)
// PUT localhost:3000/beans/:id
router.put('/:id', isLoggedIn, beansCtrl.update)
// DELETE localhost:3000/beans/:id
router.delete('/:id', isLoggedIn, beansCtrl.delete)

export {
  router
}