import nodemailer from 'nodemailer'

export type SendEmailInput = {
  fromName: string
  fromEmail?: string
  to: string
  subject: string
  text: string
}

export async function sendEmail(input: SendEmailInput) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `${input.fromName} <${process.env.SMTP_FROM || input.fromEmail || process.env.SMTP_USER}>`,
    to: input.to,
    subject: input.subject,
    text: input.text,
  })
} 