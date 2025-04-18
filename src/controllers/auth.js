import bcrypt from 'bcrypt'

import { validateAuth } from '../schemas/auth.js'
import { config } from '../config/config.js'
import { generateToken } from '../utils/GenerateToken.js'

export class AuthController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  login = async (req, res) => {
    console.log('Login request', req.body)

    const result = validateAuth(req.body)
    if (!result.success) return res.status(400).json({ success: false, errors: result.error })

    const user = await this.userModel.findOne({ where: { email: result.data.email } })
    if (!user) return res.status(401).json({ success: false, error: 'Invalid email' })

    const isPasswordValid = await bcrypt.compare(result.data.password, user.password)
    if (!isPasswordValid) return res.status(401).json({ success: false, error: 'Invalid password' })

    // Generate JWT token
    const token = generateToken({ data: { id: user.id, name: user.name } })

    return res.cookie('access_token', token, { httpOnly: true, secure: config.isProd, sameSite: config.isProd ? 'strict' : 'lax' }).status(200).json({
      success: true,
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email
    })
  }

  logout = async (req, res) => {
    return res.clearCookie('access_token').json({ success: true })
  }
}
