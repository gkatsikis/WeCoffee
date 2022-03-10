import { Router } from 'express'
const router = Router()
import * as beansCtrl from '../controllers/beans.js'
import { isLoggedIn } from '../middleware/middleware.js'



export {
  router
}