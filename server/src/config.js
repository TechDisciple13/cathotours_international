import 'dotenv/config'

const list = (value, fallback) => (value || fallback).split(',').map((s) => s.trim()).filter(Boolean)

export const config = {
  port: Number(process.env.PORT) || 5000,
  isProd: process.env.NODE_ENV === 'production',
  clientOrigins: list(process.env.CLIENT_ORIGIN, 'http://localhost:5173'),
  trustProxy: process.env.TRUST_PROXY === 'true',
  notifyEmail: process.env.NOTIFY_EMAIL || '',
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 465,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || process.env.SMTP_USER || '',
  },
  appsScript: { url: process.env.APPS_SCRIPT_URL || '', secret: process.env.APPS_SCRIPT_SECRET || '' },
}

export const smtpConfigured = Boolean(config.smtp.host && config.smtp.user && config.smtp.pass)
export const sheetsConfigured = Boolean(config.appsScript.url && config.appsScript.secret)
