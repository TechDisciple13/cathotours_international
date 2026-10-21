import { config, sheetsConfigured } from '../config.js'

export async function appendRow(tab, headers, row) {
  if (!sheetsConfigured) return 'skipped'
  const res = await fetch(config.appsScript.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: config.appsScript.secret, tab, headers, row }),
    signal: AbortSignal.timeout(10000),
  })
  const data = await res.json().catch(() => null)
  if (!res.ok || !data?.ok) throw new Error(`Apps Script : réponse ${res.status} ${data?.error ?? ''}`.trim())
  return 'sent'
}
