import { z } from 'zod'

const User = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  profile_image: z.string().optional()
})

export function validateUser (data) {
  return User.safeParse(data)
}
export function validateUserPartial (data) {
  return User.partial().safeParse(data)
}
