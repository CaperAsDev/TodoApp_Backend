import { config } from '../config/config.js'
import jwt from 'jsonwebtoken'

export default function verifyToken (req, res, next) {
  console.log(req.path)
  if (req.path === '/api/v1/auth/login' || req.path === '/api/v1/user/register') {
    return next()
  }

  if (!req.cookies.access_token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const decoded = jwt.verify(token, config.jwtSecret)
    req.session.user = decoded
    next()
  } catch (err) {
    console.log('error from verifyToken middleware', err)
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
