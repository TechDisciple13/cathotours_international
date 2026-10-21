import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { config, sheetsConfigured, smtpConfigured } from './config.js'
import inscription from './routes/inscription.js'
import newsletter from './routes/newsletter.js'

const app = express()
app.disable('x-powered-by')
if (config.trustProxy) app.set('trust proxy', 1)

app.use(helmet())
app.use(cors({ origin: (origin, cb) => cb(null, !origin || config.clientOrigins.includes(origin)), methods: ['GET', 'POST'] }))
app.use(express.json({ limit: '10kb' }))

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/inscription', inscription)
app.use('/api/newsletter', newsletter)
app.use('/api', (_req, res) => res.status(404).json({ ok: false, code: 'notFound' }))

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist')
if (config.isProd && fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.get('/{*splat}', (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.use((err, _req, res, _next) => {
  if (err.type === 'entity.parse.failed' || err.type === 'entity.too.large') return res.status(400).json({ ok: false, code: 'badRequest' })
  console.error(`[erreur] ${err.message}`)
  res.status(500).json({ ok: false, code: 'server' })
})

app.listen(config.port, () => {
  console.log(`API sur le port ${config.port}`)
  console.log(`  Google Sheets : ${sheetsConfigured ? 'configuré' : 'non configuré (stockage local uniquement)'}`)
  console.log(`  E-mails       : ${smtpConfigured ? 'configurés' : 'non configurés (aucun e-mail envoyé)'}`)
})
