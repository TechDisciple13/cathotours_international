import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { after, before, describe, test } from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'http://localhost:5173'

async function start(port, dataDir) {
  const child = spawn(process.execPath, ['src/index.js'], {
    cwd: root,
    env: { ...process.env, PORT: String(port), DATA_DIR: dataDir, NODE_ENV: 'test', CLIENT_ORIGIN: ORIGIN, SMTP_USER: '', SMTP_PASS: '', APPS_SCRIPT_URL: '', APPS_SCRIPT_SECRET: '', NOTIFY_EMAIL: '' },
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Le serveur de test ne démarre pas')), 8000)
    child.stdout.on('data', (d) => { if (String(d).includes('API sur le port')) { clearTimeout(timer); resolve() } })
    child.on('exit', (code) => reject(new Error(`Serveur arrêté (code ${code})`)))
  })
  return child
}

const post = (base, route, body, headers = {}) =>
  fetch(base + route, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) })

const valid = { lastName: 'Test', firstNames: 'Essai', gender: 'female', role: '', size: 'M', countryCode: '+228', phone: '90 12 34 56', email: 'Test@Exemple.org', event: 'AfterCatho', channel: 'email', lang: 'fr', website: '', consent: true }

describe('API', () => {
  let server, dir
  const base = 'http://localhost:5481'
  before(async () => { dir = await mkdtemp(path.join(tmpdir(), 'catho-')); server = await start(5481, dir) })
  after(async () => { server.kill(); await rm(dir, { recursive: true, force: true }) })

  test('santé et en-têtes de sécurité', async () => {
    const res = await fetch(`${base}/api/health`)
    assert.equal(res.status, 200)
    assert.equal(res.headers.get('x-content-type-options'), 'nosniff')
    assert.equal(res.headers.get('x-powered-by'), null)
  })

  test('inscription valide : enregistrée, e-mail en minuscules, téléphone normalisé', async () => {
    assert.equal((await post(base, '/api/inscription', valid)).status, 201)
    const saved = JSON.parse(await readFile(path.join(dir, 'inscriptions.json'), 'utf8'))
    assert.equal(saved.length, 1)
    assert.equal(saved[0].email, 'test@exemple.org')
    assert.equal(saved[0].phone, '90123456')
  })

  test('inscription invalide : 400 avec codes d\'erreur', async () => {
    const res = await post(base, '/api/inscription', { ...valid, email: 'abc', phone: '12ab', event: 'Inconnu', gender: 'x' })
    const data = await res.json()
    assert.equal(res.status, 400)
    assert.equal(data.errors.email, 'invalidEmail')
    assert.equal(data.errors.phone, 'invalidPhone')
    assert.equal(data.errors.event, 'required')
  })

  test('sans consentement : refusé (inscription et newsletter), rien enregistré', async () => {
    const a = await post(base, '/api/inscription', { ...valid, consent: false })
    assert.equal(a.status, 400)
    assert.equal((await a.json()).errors.consent, 'required')
    const { consent, ...sansConsent } = valid
    assert.equal((await post(base, '/api/inscription', sansConsent)).status, 400)
    assert.equal((await post(base, '/api/newsletter', { email: 'c@d.org' })).status, 400)
    assert.equal(JSON.parse(await readFile(path.join(dir, 'inscriptions.json'), 'utf8')).length, 1)
  })

  test('inscription valide : date du consentement conservée', async () => {
    const saved = JSON.parse(await readFile(path.join(dir, 'inscriptions.json'), 'utf8'))
    assert.equal(saved[0].consent, true)
    assert.ok(!Number.isNaN(Date.parse(saved[0].consentAt)))
  })

  test('champ piège rempli : réponse neutre, rien enregistré', async () => {
    assert.equal((await post(base, '/api/inscription', { ...valid, website: 'http://spam.example' })).status, 201)
    assert.equal(JSON.parse(await readFile(path.join(dir, 'inscriptions.json'), 'utf8')).length, 1)
  })

  test('JSON invalide : 400 ; route inconnue : 404', async () => {
    assert.equal((await post(base, '/api/inscription', '{pas du json')).status, 400)
    assert.equal((await fetch(`${base}/api/inconnu`)).status, 404)
  })

  test('CORS : origine du client autorisée, autre origine refusée', async () => {
    assert.equal((await fetch(`${base}/api/health`, { headers: { Origin: ORIGIN } })).headers.get('access-control-allow-origin'), ORIGIN)
    assert.equal((await fetch(`${base}/api/health`, { headers: { Origin: 'http://evil.example' } })).headers.get('access-control-allow-origin'), null)
  })

  test('newsletter : valide, sans doublon, e-mail invalide refusé', async () => {
    assert.equal((await post(base, '/api/newsletter', { email: 'a@b.org', lang: 'en', consent: true })).status, 201)
    assert.equal((await post(base, '/api/newsletter', { email: 'A@B.org', consent: true })).status, 201)
    assert.equal(JSON.parse(await readFile(path.join(dir, 'newsletters.json'), 'utf8')).length, 1)
    assert.equal((await post(base, '/api/newsletter', { email: 'nope' })).status, 400)
  })
})

describe('Limitation de débit', () => {
  let server, dir
  const base = 'http://localhost:5482'
  before(async () => { dir = await mkdtemp(path.join(tmpdir(), 'catho-')); server = await start(5482, dir) })
  after(async () => { server.kill(); await rm(dir, { recursive: true, force: true }) })

  test('429 après 10 requêtes sur la même route', async () => {
    const codes = []
    for (let i = 0; i < 12; i++) codes.push((await post(base, '/api/newsletter', { email: `u${i}@exemple.org`, consent: true })).status)
    assert.deepEqual(codes.slice(0, 10), Array(10).fill(201))
    assert.equal(codes[11], 429)
  })
})
