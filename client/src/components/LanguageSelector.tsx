import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { languages } from '../i18n'

export default function LanguageSelector() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [])

  return (
    <div ref={ref} className="relative">
      <button type="button" aria-label={`${t('common.language')} : ${i18n.language.toUpperCase()}`} aria-expanded={open} onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-xs font-medium text-ink hover:text-brand-green md:text-[14px]">
        {i18n.language.toUpperCase()}
        <ChevronDown className="size-3.5" aria-hidden="true" />
      </button>
      {open && (
        <ul aria-label={t('common.language')} className="absolute right-0 top-full z-50 mt-2 min-w-16 rounded-lg border border-black/10 bg-white py-1 shadow-lg">
          {languages.map((l) => (
            <li key={l}>
              <button type="button" aria-current={l === i18n.language ? 'true' : undefined} onClick={() => { void i18n.changeLanguage(l); setOpen(false) }}
                className={`w-full px-4 py-1.5 text-left text-xs hover:bg-surface ${l === i18n.language ? 'font-semibold text-brand-green' : ''}`}>
                {l.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
