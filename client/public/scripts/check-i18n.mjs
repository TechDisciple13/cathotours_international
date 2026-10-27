// Vérifie que FR, EN, ES et IT ont les mêmes clés et les mêmes variables {{...}}.
import { readFileSync } from 'node:fs'

const langs = ['fr', 'en', 'es', 'it']
// Contenus de démonstration volontairement non traduits (repli sur le français).
const DEMO = ['news.items.', 'testimonials.quote', 'testimonials.author', 'testimonials.role', 'privacy.sections.', 'privacy.draftNotice', 'pages.draftNotice', 'pages.legal.']

const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) => (typeof v === 'object' ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v]]))

const data = Object.fromEntries(
  langs.map((l) => [l, Object.fromEntries(flatten(JSON.parse(readFileSync(new URL(`../src/i18n/locales/${l}.json`, import.meta.url), 'utf8'))))]),
)
const vars = (s) => (String(s).match(/\{\{\s*\w+\s*\}\}/g) ?? []).sort().join(',')
let problems = 0

for (const l of langs.slice(1)) {
  const missing = Object.keys(data.fr).filter((k) => !(k in data[l]) && !DEMO.some((d) => k.startsWith(d)))
  const extra = Object.keys(data[l]).filter((k) => !(k in data.fr))
  const empty = Object.entries(data[l]).filter(([, v]) => !String(v).trim()).map(([k]) => k)
  const badVars = Object.keys(data[l]).filter((k) => k in data.fr && vars(data[l][k]) !== vars(data.fr[k]))
  for (const [label, list] of [['clés manquantes', missing], ['clés en trop', extra], ['valeurs vides', empty], ['variables {{}} incohérentes', badVars]]) {
    if (list.length) { problems += list.length; console.log(`[${l}] ${label} (${list.length}) : ${list.join(', ')}`) }
  }
}
console.log(problems ? `\n${problems} problème(s) de traduction.` : 'Traductions cohérentes : mêmes clés et mêmes variables dans les 4 langues.')
process.exit(problems ? 1 : 0)
