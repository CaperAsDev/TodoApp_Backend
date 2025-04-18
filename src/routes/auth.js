import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'
export const authRouter = ({ userModel }) => {
  const authController = new AuthController({ userModel })
  const router = Router()

  router.post('/login', authController.login)
  router.post('/logout', authController.logout)

  return router
}
