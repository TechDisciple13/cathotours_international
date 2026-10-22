import { randomUUID } from 'node:crypto'
import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { buildInscriptionMessages, sendMessages } from '../services/mailer.js'
import { appendRow } from '../services/sheets.js'
import { appendRecord } from '../services/storage.js'
import { parseInscription } from '../validation.js'

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false, message: { ok: false, code: 'rateLimit' } })
const HEADERS = ['Date', 'Nom', 'Prénoms', 'Sexe', 'Fonction', 'Taille', 'Téléphone', 'E-mail', 'Événement', 'Canal', 'Langue', 'Consentement']

const router = Router()

router.post('/', limiter, async (req, res) => {
  const body = req.body ?? {}
  if (typeof body.website === 'string' && body.website.trim()) return res.status(201).json({ ok: true })

  const parsed = parseInscription(body)
  if (!parsed.success) return res.status(400).json({ ok: false, code: 'validation', errors: parsed.errors })

  const d = parsed.data
  const now = new Date().toISOString()
  await appendRecord('inscriptions.json', { id: randomUUID(), createdAt: now, consentAt: now, ...d })

  const row = [now, d.lastName, d.firstNames, d.gender, d.role, d.size, `${d.countryCode} ${d.phone}`, d.email, d.event, d.channel, d.lang, now]
  const [sheet, mail] = await Promise.allSettled([appendRow('Inscriptions', HEADERS, row), sendMessages(buildInscriptionMessages(d))])
  for (const [name, r] of [['Google Sheets', sheet], ['E-mail', mail]]) {
    if (r.status === 'rejected') console.error(`[inscription] ${name} : ${r.reason?.message}`)
  }
  res.status(201).json({ ok: true })
})

export default router
