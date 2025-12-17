// schema.server.ts
import { z } from 'zod'

export const formSchemaServer = z.object({
  license: z.string().min(11).max(11),

  birthDate: z.coerce.date({
    message: 'Wskazać datę.',
  }),
})
