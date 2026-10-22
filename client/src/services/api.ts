export type ApiResult = { ok: true } | { ok: false; code: 'validation' | 'rateLimit' | 'server' | 'network' }

const base = import.meta.env.VITE_API_URL ?? ''

async function post(path: string, body: unknown): Promise<ApiResult> {
  try {
    const res = await fetch(`${base}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) return { ok: true }
    if (res.status === 400) return { ok: false, code: 'validation' }
    if (res.status === 429) return { ok: false, code: 'rateLimit' }
    return { ok: false, code: 'server' }
  } catch {
    return { ok: false, code: 'network' }
  }
}

export interface InscriptionPayload {
  lastName: string; firstNames: string; gender: string; role: string; size: string
  countryCode: string; phone: string; email: string; event: string; channel: string
  lang: string; website: string; consent: boolean
}

export const submitInscription = (payload: InscriptionPayload) => post('/api/inscription', payload)
export const submitNewsletter = (payload: { email: string; lang: string; website: string; consent: boolean }) => post('/api/newsletter', payload)

export const apiMessageKey = (code: Exclude<ApiResult, { ok: true }>['code']) =>
  code === 'rateLimit' ? 'api.errorRateLimit' : code === 'network' ? 'api.errorNetwork' : 'api.errorServer'
