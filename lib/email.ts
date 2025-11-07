import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

export type SendEmailInput = {
  fromName: string
  fromEmail?: string
  to: string
  subject: string
  text: string
}

export async function sendEmail(input: SendEmailInput) {
  const apiKey = process.env.MAILERSEND_API_TOKEN
  const fromEmail = process.env.MAILERSEND_FROM
  const fromName = process.env.MAILERSEND_FROM_NAME || input.fromName

  if (!apiKey || !fromEmail) {
    throw new Error('MailerSend environment variables missing')
  }

  const mailerSend = new MailerSend({
    apiKey,
  })

  const sentFrom = new Sender(fromEmail, fromName)
  const recipients = [new Recipient(input.to, input.to)]

  const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(input.subject)
      .setHtml(`<pre>${input.text}</pre>`)
      .setText(input.text)

  try {
    await mailerSend.email.send(emailParams)
  } catch (err: any) {
    console.error('MailerSend failed:', err.response?.body || err.message || err)
    throw err
  }}