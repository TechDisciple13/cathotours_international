export const EVENTS = ['AfterCatho', "L'Universel", 'Pélé Vélo']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const LANGS = ['fr', 'en', 'es', 'it']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const str = (v) => (typeof v === 'string' ? v.trim() : '')
const result = (errors, data) => (Object.keys(errors).length ? { success: false, errors } : { success: true, data })

export function parseInscription(body) {
  const d = {
    lastName: str(body.lastName),
    firstNames: str(body.firstNames),
    gender: str(body.gender),
    role: str(body.role),
    size: str(body.size),
    countryCode: str(body.countryCode),
    phone: str(body.phone).replace(/[\s.-]/g, ''),
    email: str(body.email).toLowerCase(),
    event: str(body.event),
    channel: str(body.channel),
    lang: LANGS.includes(str(body.lang)) ? str(body.lang) : 'fr',
  }
  const e = {}
  for (const [key, max] of [['lastName', 80], ['firstNames', 120]]) {
    if (!d[key]) e[key] = 'required'
    else if (d[key].length > max) e[key] = 'tooLong'
  }
  if (!['female', 'male'].includes(d.gender)) e.gender = 'required'
  if (d.role.length > 100) e.role = 'tooLong'
  if (d.size && !SIZES.includes(d.size)) e.size = 'invalid'
  if (!/^\+\d{1,4}$/.test(d.countryCode)) e.countryCode = 'invalid'
  if (!d.phone) e.phone = 'required'
  else if (!/^\d{6,12}$/.test(d.phone)) e.phone = 'invalidPhone'
  if (!d.email) e.email = 'required'
  else if (d.email.length > 254 || !EMAIL.test(d.email)) e.email = 'invalidEmail'
  if (!EVENTS.includes(d.event)) e.event = 'required'
  if (!['email', 'whatsapp'].includes(d.channel)) e.channel = 'invalid'
  return result(e, d)
}

export function parseNewsletter(body) {
  const d = { email: str(body.email).toLowerCase(), lang: LANGS.includes(str(body.lang)) ? str(body.lang) : 'fr' }
  const e = {}
  if (!d.email) e.email = 'required'
  else if (d.email.length > 254 || !EMAIL.test(d.email)) e.email = 'invalidEmail'
  return result(e, d)
}
