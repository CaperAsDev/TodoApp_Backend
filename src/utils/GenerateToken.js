import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'
export function generateToken ({ data, expiresTime = '1h' }) {
  // Generate JWT token
  const token = jwt.sign(data, config.jwtSecret, { expiresIn: expiresTime })

  return token
}
