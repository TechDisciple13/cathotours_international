import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { appendRow } from '../services/sheets.js'
import { appendRecord, hasEmail } from '../services/storage.js'
import { parseNewsletter } from '../validation.js'

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false, message: { ok: false, code: 'rateLimit' } })

const router = Router()

router.post('/', limiter, async (req, res) => {
  const body = req.body ?? {}
  if (typeof body.website === 'string' && body.website.trim()) return res.status(201).json({ ok: true })

  const parsed = parseNewsletter(body)
  if (!parsed.success) return res.status(400).json({ ok: false, code: 'validation', errors: parsed.errors })

  const { email, lang } = parsed.data
  if (!(await hasEmail('newsletters.json', email))) {
    const createdAt = new Date().toISOString()
    await appendRecord('newsletters.json', { createdAt, consentAt: createdAt, email, lang, consent: true })
    try {
      await appendRow('Newsletter', ['Date', 'E-mail', 'Langue', 'Consentement'], [createdAt, email, lang, createdAt])
    } catch (err) {
      console.error(`[newsletter] Google Sheets : ${err.message}`)
    }
  }
  res.status(201).json({ ok: true })
})

export default router
