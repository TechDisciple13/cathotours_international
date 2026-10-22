import { Mail } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { apiMessageKey, submitNewsletter } from '../services/api'

type Status = 'idle' | 'errorEmpty' | 'errorInvalid' | 'errorConsent' | 'sending' | 'success' | 'error'

export default function Newsletter() {
  const { t, i18n } = useTranslation()
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorKey, setErrorKey] = useState('api.errorServer')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    if (!value) return setStatus('errorEmpty')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return setStatus('errorInvalid')
    if (!consent) return setStatus('errorConsent')
    setStatus('sending')
    const result = await submitNewsletter({ email: value, lang: i18n.language, website, consent })
    if (result.ok) { setStatus('success'); setEmail(''); setConsent(false) }
    else { setErrorKey(apiMessageKey(result.code)); setStatus('error') }
  }

  const message = status === 'error' ? t(errorKey) : status === 'sending' ? t('api.sending') : status === 'idle' ? '' : t(`newsletter.${status}`)

  return (
    <section className="mt-4 bg-brand-green text-white md:mt-6">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-3 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 xl:px-20 md:py-5">
        <div className="flex items-start gap-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-black/25 md:size-14">
            <Mail className="size-5 md:size-6" aria-hidden="true" />
          </span>
          <div className="md:max-w-[560px]">
            <h2 className="text-sm font-semibold md:text-[21px]">{t('newsletter.title')}</h2>
            <p className="mt-1 hidden text-xs leading-relaxed md:block">{t('newsletter.text')}</p>
          </div>
        </div>
        <form onSubmit={(e) => void onSubmit(e)} noValidate className="relative md:w-[420px]">
          <div className="flex gap-2 md:gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (status !== 'sending') setStatus('idle') }}
              aria-label={t('newsletter.emailLabel')}
              aria-invalid={status === 'errorEmpty' || status === 'errorInvalid'}
              aria-describedby="newsletter-msg"
              placeholder={t('newsletter.placeholder')}
              className="h-10 min-w-0 flex-1 rounded-full bg-white px-4 text-xs text-ink placeholder:text-ink/65 md:h-11 md:text-[13px] focus-visible:outline-white"
            />
            <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] size-0 opacity-0" />
            <button type="submit" disabled={status === 'sending'} className="h-10 shrink-0 rounded-full bg-brand-orange px-5 text-xs font-medium hover:brightness-90 focus-visible:outline-white disabled:opacity-60 md:h-11 md:px-7 md:text-[13px]">
              {t('newsletter.button')}
            </button>
          </div>
          <label className="mt-2 flex items-start gap-2 text-[11px] leading-snug">
            <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); if (status !== 'sending') setStatus('idle') }} className="mt-0.5 size-3.5 shrink-0 accent-brand-orange focus-visible:outline-white" />
            <span>
              {t('privacy.newsletterBefore')}
              <Link to="/politique-de-confidentialite" className="underline focus-visible:outline-white">{t('privacy.consentLink')}</Link>
              {t('privacy.newsletterAfter')}
            </span>
          </label>
          <p id="newsletter-msg" role="status" aria-live="polite" className="mt-2 min-h-4 text-[11px] text-white">{message}</p>
        </form>
      </div>
    </section>
  )
}
