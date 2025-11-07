import { NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyHCaptcha } from '@/lib/hcaptcha'
import { sendEmail } from '@/lib/email'

const schema = z.object({
  name: z.string().min(1),
  letter: z.string().min(1),
  token: z.string().optional(),
})

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = schema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid' }, { status: 400 })

  const ok = await verifyHCaptcha(parsed.data.token)
  if (!ok) return NextResponse.json({ error: 'Captcha failed' }, { status: 400 })

  await sendEmail({
    fromName: parsed.data.name,
    to: 'hej@jegerdaniel.dk',
    subject: `Brev fra ${parsed.data.name}`,
    text: parsed.data.letter,
  })

  return NextResponse.json({ ok: true })
}