import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { createClient } from '@supabase/supabase-js'
import { formSchemaServer } from '@/components/schema.server'
import { z } from "zod"

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

export const Route = createFileRoute('/api/verify')({
  server: {
    handlers: {
      GET: async ({request}) => {
        console.log("hello")
        return json ({ status: 200 })
      },
      // POST: async ({ request }) => {
      //   // 1️⃣ Read request body
      //   const body = await request.json()
      //   console.log(body)
      //   const parsed = formSchemaServer.safeParse(body)

      //   if (!parsed.success) {
      //     return json(
      //       {
      //         success: false,
      //         errors: parsed.error.flatten(),
      //       },
      //       { status: 400 }
      //     )
      //   }

      //   const { license, birthDate } = parsed.data

      //   // 3️⃣ Normalize Date → YYYY-MM-DD for Postgres DATE
      //   const birthDateStr = birthDate.toISOString().slice(0, 10)

      //   // 4️⃣ Query Supabase
      //   const { data, error } = await supabase
      //     .from('users')
      //     .select('*')
      //     .eq('number', license)
      //     .eq('birth_date', birthDateStr)
      //     .single()

      //   if (error) {
      //     return json(
      //       { success: false, message: 'Not found' },
      //       { status: 404 }
      //     )
      //   }

      //   // 5️⃣ Success
      //   return json({
      //     success: true,
      //     data,
      //   })
      // },
      POST: async ({ request }) => {
  try {
    const ct = request.headers.get('content-type') ?? ''
    console.log('[verify] content-type:', ct)

    if (!ct.includes('application/json')) {
      return json(
        { success: false, message: 'Expected application/json' },
        { status: 400 }
      )
    }

    const bodyText = await request.text()
    console.log('[verify] raw body:', bodyText)

    // Parse JSON ourselves so we can log failures cleanly
    let body: unknown
    try {
      body = JSON.parse(bodyText)
    } catch {
      return json(
        { success: false, message: 'Invalid JSON body' },
        { status: 400 }
      )
    }

    const parsed = formSchemaServer.safeParse(body)

    if (!parsed.success) {
      return json(
        { success: false, errors: z.flattenError(parsed.error) },
        { status: 400 }
      )
    }

    const { license, birthDate } = parsed.data
    const birthDateStr = birthDate.toISOString().slice(0, 10)
    console.log('[verify] SUPABASE_URL present?', !!process.env.SUPABASE_URL)
    console.log('[verify] SUPABASE_KEY present?', !!process.env.SUPABASE_KEY)

    const { data, error } = await supabase
      .from('allowed_pairs')
      .select('*')
      .eq('number', license)
      .eq('birth_date', birthDateStr)
      .single()

    if (error) {
      console.log('[verify] supabase error:', error)
      return json(
        { success: false, message: error.message ?? 'Not found' },
        { status: 404 }
      )
    }

    return json({ success: true, data })
  } catch (err) {
    console.error('[verify] unhandled:', err)
    return json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
    },
  },
})
