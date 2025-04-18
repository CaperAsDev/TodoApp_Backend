import { validateUser, validateUserPartial } from '../schemas/user.js'
import { config } from '../config/config.js'
import { generateToken } from '../utils/GenerateToken.js'
import bcrypt from 'bcrypt'

export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  create = async (req, res) => {
    const result = validateUser(req.body)

    if (!result.success) return res.status(400).json({ errors: result.error })
    try {
      const hashedPassword = await bcrypt.hash(result.data.password, Number(config.saltRounds))
      const newUser = await this.userModel.create({ ...result.data, password: hashedPassword })
      const { id, role, name, email } = newUser.dataValues
      const token = generateToken({ data: { id, name } })

      if (newUser && req.file) {
        // Si req.file está definido (es decir, se proporcionó una imagen), actualizamos el profile_image del usuario
        const { path } = req.file
        const url = `${req.protocol}://${req.headers.host}/${path}`
        await newUser.update({ profile_image: url })
      }

      return res.cookie('access_token', token, { httpOnly: true, secure: config.isProd, sameSite: config.isProd ? 'strict' : 'lax' })
        .status(201).json({ success: true, id, role, name, email })
    } catch (error) {
      console.error('Error creating user', error)
      res.status(400).json({ success: false, error: 'user could not be created' })
    }
  }

  update = async (req, res) => {
    const result = validateUserPartial(req.body)
    const user = req.session.user

    if (!result.success) return res.status(400).json({ errors: result.error })

    const updatedUser = await this.userModel.update(result.data, { where: { id: user.id } })

    if (!updatedUser) return res.status(404).json({ error: 'User not found' })

    return res.json({ success: true, user: updatedUser })
  }

  delete = async (req, res) => {
    const user = req.session.user

    const deletedUser = await this.userModel.destroy({ where: { id: user.id } })

    if (!deletedUser) return res.status(404).json({ error: 'User not found' })

    return res.json({ success: true })
  }
}
