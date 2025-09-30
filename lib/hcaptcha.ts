export async function verifyHCaptcha(token: string | undefined) {
  if (!token) return false
  const secret = process.env.HCAPTCHA_SECRET
  if (!secret) return false
  const res = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: String(token) }).toString(),
  })
  const data = await res.json()
  return Boolean(data.success)
} 