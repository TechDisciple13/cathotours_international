import assert from 'node:assert/strict'
import { test } from 'node:test'
import { acknowledgement } from '../src/emails/acknowledgement.js'
import { buildInscriptionMessages } from '../src/services/mailer.js'

const d = { lastName: 'Mensah', firstNames: 'Ama', event: 'AfterCatho', channel: 'email', email: 'ama@exemple.org', lang: 'fr' }

test('message de confirmation dans les 4 langues, variables remplacées', () => {
  for (const lang of ['fr', 'en', 'es', 'it']) {
    const m = acknowledgement({ ...d, lang })
    assert.ok(m.subject.includes('AfterCatho'), `${lang} : objet`)
    assert.ok(m.text.includes('Ama') && m.text.includes('AfterCatho'), `${lang} : corps`)
    assert.ok(!m.text.includes('{'), `${lang} : aucune variable non remplacée`)
  }
  assert.ok(acknowledgement({ ...d, lang: 'en' }).subject.includes('pre-registration'))
})

test('langue inconnue : repli sur le français', () => {
  assert.ok(acknowledgement({ ...d, lang: 'xx' }).text.startsWith('Bonjour Ama'))
})

test('injection d\'en-tête neutralisée dans l\'objet', () => {
  const m = acknowledgement({ ...d, event: 'X\r\nBcc: a@b.c' })
  assert.ok(!/[\r\n]/.test(m.subject))
})

test('canal e-mail : accusé envoyé au participant ; canal WhatsApp : aucun accusé', () => {
  const mail = buildInscriptionMessages({ ...d, gender: 'female', role: '', size: '', countryCode: '+228', phone: '90123456', lang: 'en' })
  assert.ok(mail.some((x) => x.to === 'ama@exemple.org' && x.subject.includes('pre-registration')))
  const wa = buildInscriptionMessages({ ...d, channel: 'whatsapp', gender: 'female', role: '', size: '', countryCode: '+228', phone: '90123456' })
  assert.ok(!wa.some((x) => x.to === 'ama@exemple.org'))
})
