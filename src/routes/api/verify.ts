import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/verify')({
  server: {
    handlers: {
      GET: async () => {
        return json({ success: true })
      },

      POST: async ({ request }) => {
        try {
          const bodyText = await request.text()

          let body: unknown = null
          try {
            body = bodyText ? JSON.parse(bodyText) : null
          } catch {
            // Even if JSON is invalid, still return true
          }

          return json({
            success: true,
            data: body ?? null,
          })
        } catch {
          return json({
            success: true,
          })
        }
      },
    },
  },
})
