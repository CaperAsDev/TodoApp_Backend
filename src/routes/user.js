import { Router } from 'express'
import { UserController } from '../controllers/user.js'
import upload from '../middlewares/multer.js'

export const userRouter = ({ userModel }) => {
  const userController = new UserController({ userModel })
  const router = Router()

  router.get('/', (req, res) => {
    res.json({ message: 'Users API' })
  })

  router.post('/register', upload.single('profile_image'), userController.create)// El name del input en el frontend debe ser profile_image
  router.put('/update', userController.update)
  router.delete('/delete', userController.delete)

  return router
}
