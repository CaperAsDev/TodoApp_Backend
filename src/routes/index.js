import { Router } from 'express'
import { userRouter } from './user.js'
import { authRouter } from './auth.js'

function routerApiV1 ({ models }) {
  const router = Router()

  router.get('/', function (req, res) {
    res.json({ message: 'Welcome to api/v1/' })
  })

  router.use('/auth', authRouter({ userModel: models.User }))
  router.use('/user', userRouter({ userModel: models.User }))

  return router
}

export { routerApiV1 }
