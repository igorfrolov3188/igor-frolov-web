// lib/api/verify.ts
import { formSchema } from '@/components/schema.client'
import type { z } from 'zod'

type VerifyInput = z.infer<typeof formSchema>

// type VerifyResponse =
//   | { success: true; data: unknown }
//   | { success: false; message?: string; errors?: unknown }

export async function verifyUserRequest(input: VerifyInput) {
  const res = await fetch('/api/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  const contentType = res.headers.get('content-type')

  if (!contentType?.includes('application/json')) {
    const text = await res.text()
    throw new Error(text || 'Non-JSON response from server')
  }

  const data = await res.json()

  if (!res.ok) {
    throw data
  }

  return data
}
