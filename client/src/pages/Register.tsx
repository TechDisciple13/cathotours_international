import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { countries, events, sizes } from '../config/registration'
import { usePageTitle } from '../hooks/usePageTitle'
import { apiMessageKey, submitInscription } from '../services/api'

interface Values { lastName: string; firstNames: string; gender: string; role: string; size: string; countryCode: string; phone: string; email: string; event: string; channel: string }
type Field = keyof Values
type Key = Field | 'consent'
type ErrorKey = 'required' | 'invalidEmail' | 'invalidPhone'

const initial: Values = { lastName: '', firstNames: '', gender: '', role: '', size: '', countryCode: '+228', phone: '', email: '', event: '', channel: 'email' }
const order: Key[] = ['lastName', 'firstNames', 'gender', 'phone', 'email', 'event', 'consent']

function validate(v: Values, consent: boolean) {
  const e: Partial<Record<Key, ErrorKey>> = {}
  if (!consent) e.consent = 'required'
  for (const k of ['lastName', 'firstNames', 'gender', 'event'] as const) if (!v[k].trim()) e[k] = 'required'
  if (!v.email.trim()) e.email = 'required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'invalidEmail'
  const digits = v.phone.replace(/[\s.-]/g, '')
  if (!digits) e.phone = 'required'
  else if (!/^\d{6,12}$/.test(digits)) e.phone = 'invalidPhone'
  return e
}

const inputCls = 'mt-1 h-11 w-full rounded-lg border bg-white px-3 text-sm text-ink placeholder:text-ink/65'
const errColor = 'text-[#B3261E]'

function Row({ id, label, error, optional, children }: { id: string; label: string; error?: string; optional?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-[13px] font-medium">
        {label}
        {optional && <span className="font-normal text-ink/70"> ({optional})</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className={`mt-1 text-xs ${errColor}`}>{error}</p>}
    </div>
  )
}

export default function Register() {
  const { t, i18n } = useTranslation()
  usePageTitle(t('register.title'), t('seo.register'))
  const [params] = useSearchParams()
  const preset = params.get('event') ?? ''
  const [values, setValues] = useState<Values>(() => ({ ...initial, event: (events as readonly string[]).includes(preset) ? preset : '' }))
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorKey, setErrorKey] = useState('api.errorServer')
  const [website, setWebsite] = useState('')
  const [consent, setConsent] = useState(false)

  const errors = validate(values, consent)
  const err = (k: Key) => (touched[k] || submitted ? errors[k] : undefined)
  const msg = (k: Key) => (err(k) ? (k === 'consent' ? t('register.consentRequired') : t(`register.${errors[k]}`)) : undefined)
  const regionName = (iso: string) => new Intl.DisplayNames([i18n.language], { type: 'region' }).of(iso) ?? iso

  const change = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
    setStatus('idle')
  }
  const blur = (k: Key) => () => setTouched((s) => ({ ...s, [k]: true }))
  const props = (k: Field) => ({
    id: k, name: k, value: values[k], onChange: change, onBlur: blur(k),
    'aria-invalid': !!err(k), 'aria-describedby': err(k) ? `${k}-error` : undefined,
    className: `${inputCls} ${err(k) ? 'border-[#B3261E]' : 'border-black/15'}`,
  })

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const first = order.find((k) => errors[k])
    if (first) { setStatus('idle'); document.getElementById(first)?.focus(); return }
    setStatus('sending')
    const result = await submitInscription({ ...values, phone: values.phone.replace(/[\s.-]/g, ''), lang: i18n.language, website, consent })
    if (result.ok) {
      setStatus('success'); setValues(initial); setConsent(false); setTouched({}); setSubmitted(false)
    } else {
      setErrorKey(apiMessageKey(result.code)); setStatus('error')
    }
  }

  return (
    <>
      <PageHeader breadcrumb={t('register.breadcrumb')} title={t('register.title')} intro={t('register.intro')} />
      <section className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-12 xl:px-20">
        <form onSubmit={(e) => void submit(e)} noValidate className="mx-auto max-w-2xl rounded-lg border border-black/5 bg-white p-5 shadow-sm md:p-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Row id="lastName" label={t('register.lastName')} error={msg('lastName')}><input {...props('lastName')} autoComplete="family-name" /></Row>
            <Row id="firstNames" label={t('register.firstNames')} error={msg('firstNames')}><input {...props('firstNames')} autoComplete="given-name" /></Row>
            <Row id="gender" label={t('register.gender')} error={msg('gender')}>
              <select {...props('gender')}>
                <option value="">{t('register.select')}</option>
                <option value="female">{t('register.female')}</option>
                <option value="male">{t('register.male')}</option>
              </select>
            </Row>
            <Row id="role" label={t('register.role')} optional={t('register.optional')}><input {...props('role')} /></Row>
            <Row id="size" label={t('register.size')} optional={t('register.optional')}>
              <select {...props('size')}>
                <option value="">{t('register.select')}</option>
                {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Row>
            <Row id="phone" label={t('register.phone')} error={msg('phone')}>
              <div className="flex gap-2">
                <select name="countryCode" value={values.countryCode} onChange={change} aria-label={t('register.countryCode')} className={`${inputCls.replace('w-full', '')} w-32 shrink-0 border-black/15`}>
                  {countries.map((c) => <option key={c.iso} value={c.code}>{regionName(c.iso)} ({c.code})</option>)}
                </select>
                <input {...props('phone')} className={props('phone').className.replace('w-full', 'min-w-0 flex-1')} type="tel" inputMode="tel" autoComplete="tel-national" />
              </div>
            </Row>
            <Row id="email" label={t('register.email')} error={msg('email')}><input {...props('email')} type="email" autoComplete="email" /></Row>
            <Row id="event" label={t('register.event')} error={msg('event')}>
              <select {...props('event')}>
                <option value="">{t('register.eventPlaceholder')}</option>
                {events.map((ev) => <option key={ev} value={ev}>{ev}</option>)}
              </select>
            </Row>
          </div>

          <fieldset className="mt-5">
            <legend className="text-[13px] font-medium">{t('register.channel')}</legend>
            <div className="mt-2 flex gap-6">
              {(['email', 'whatsapp'] as const).map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="channel" value={c} checked={values.channel === c} onChange={change} className="size-4 accent-brand-green" />
                  {t(c === 'email' ? 'register.channelEmail' : 'register.channelWhatsapp')}
                </label>
              ))}
            </div>
            {values.channel === 'whatsapp' && <p className="mt-2 text-xs text-ink/70">{t('register.whatsappNote')}</p>}
          </fieldset>

          <div className="mt-5">
            <label className="flex items-start gap-2 text-[13px]">
              <input type="checkbox" id="consent" checked={consent} onChange={(e) => { setConsent(e.target.checked); setStatus('idle') }} onBlur={blur('consent')} aria-invalid={!!err('consent')} aria-describedby={err('consent') ? 'consent-error' : undefined} className="mt-0.5 size-4 shrink-0 accent-brand-green" />
              <span>
                {t('privacy.consentBefore')}
                <Link to="/politique-de-confidentialite" className="text-brand-green underline">{t('privacy.consentLink')}</Link>
                {t('privacy.consentAfter')}
              </span>
            </label>
            {err('consent') && <p id="consent-error" role="alert" className={`mt-1 text-xs ${errColor}`}>{msg('consent')}</p>}
          </div>
          <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] size-0 opacity-0" />
          <button type="submit" disabled={status === 'sending'} className="mt-6 w-full rounded-full bg-brand-orange px-7 py-3 text-sm font-medium text-white hover:brightness-90 disabled:opacity-60 md:w-auto">
            {status === 'sending' ? t('api.sending') : t('register.submit')}
          </button>
          <p role="status" aria-live="polite" className={`mt-3 min-h-5 text-sm ${status === 'error' ? errColor : 'text-brand-green'}`}>
            {status === 'success' && t('register.success')}
            {status === 'error' && t(errorKey)}
          </p>
        </form>
      </section>
    </>
  )
}