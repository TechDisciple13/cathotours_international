import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import it from './locales/it.json'

export const languages = ['fr', 'en', 'es', 'it'] as const

const stored = (() => {
  try { return localStorage.getItem('lang') } catch { return null }
})()

void i18n.use(initReactI18next).init({
  resources: { fr: { translation: fr }, en: { translation: en }, es: { translation: es }, it: { translation: it } },
  lng: languages.find((l) => l === stored) ?? 'fr',
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (l) => {
  document.documentElement.lang = l
  try { localStorage.setItem('lang', l) } catch { /* stockage indisponible */ }
})
document.documentElement.lang = i18n.language

export default i18n
