import { z } from 'zod'

const Auth = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export function validateAuth (data) {
  return Auth.safeParse(data)
}
