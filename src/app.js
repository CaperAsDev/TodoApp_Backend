import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import verifyToken from './middlewares/verifyToken.js'

import { routerApiV1 } from './routes/index.js'

const createApp = async ({ models }) => {
  const app = express()
  app.disable('x-powered-by')

  app.use(cors())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(cookieParser())
  app.use((req, res, next) => {
    console.log('Request received:', req.cookies.access_token)
    next()
  })
  app.use(verifyToken)

  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Express API root!' })
  })

  app.use('/api/v1', routerApiV1({ models }))

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
  })
}

export { createApp }
