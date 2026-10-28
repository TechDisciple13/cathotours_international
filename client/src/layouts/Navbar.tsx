import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useLocation } from 'react-router-dom'
import LanguageSelector from '../components/LanguageSelector'
import Logo from '../components/Logo'
import { navGroups } from '../config/navLinks'

export default function Navbar() {
  const { t } = useTranslation()
  const { pathname, hash } = useLocation()
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const [acc, setAcc] = useState<string | null>(null)
  const ref = useRef<HTMLElement>(null)
  const burger = useRef<HTMLButtonElement>(null)

  const location = pathname + hash
  const [prevLocation, setPrevLocation] = useState(location)
  if (prevLocation !== location) {
    setPrevLocation(location)
    setOpen(null)
    setMobile(false)
  }

  useEffect(() => {
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(null) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(null); setMobile(false); burger.current?.focus() } }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [])

  useEffect(() => {
    if (!mobile) return
    document.body.style.overflow = 'hidden'
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !ref.current) return
      const items = [...ref.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')].filter((el) => el.offsetParent !== null)
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onTab)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onTab) }
  }, [mobile])

  const linkCls = 'flex items-center gap-1 text-[13px] font-medium text-ink hover:text-brand-green lg:text-[14px]'

  return (
    <header ref={ref} className="relative z-40 bg-white">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:h-[72px] lg:h-[88px] md:px-10 xl:px-20">
        <Logo />

        <nav aria-label={t('common.mainNav')} className="hidden items-center gap-5 md:flex lg:gap-9">
          {navGroups.map((g) => g.items ? (
            <div key={g.key} className="relative" onMouseEnter={() => setOpen(g.key)} onMouseLeave={() => setOpen(null)}>
              <button type="button" className={`${linkCls} ${g.items.some((i) => i.href === pathname) ? 'text-brand-green' : ''}`} aria-expanded={open === g.key} aria-haspopup="menu" onClick={() => setOpen(open === g.key ? null : g.key)}>
                {t(`nav.groups.${g.key}`)}
                <ChevronDown className={`size-3.5 transition-transform ${open === g.key ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {open === g.key && (
                <ul className="absolute left-0 top-full z-50 w-64 rounded-lg border border-black/10 bg-white py-2 shadow-lg">
                  {g.items.map((i) => (
                    <li key={i.key}><Link to={i.href} className="block px-4 py-2 text-[13px] hover:bg-surface hover:text-brand-green">{t(`nav.items.${i.key}`)}{i.soon && <span className="ml-2 rounded-full bg-brand-orange px-2 py-0.5 text-[10px] text-white">{t('editions.soon')}</span>}</Link></li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <NavLink key={g.key} to={g.href!} className={({ isActive }) => `${linkCls} ${isActive ? 'text-brand-green underline underline-offset-8' : ''}`}>{t(`nav.groups.${g.key}`)}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <LanguageSelector />
          <Link to="/inscription" className="hidden rounded-full bg-brand-orange px-5 py-2.5 text-[13px] font-medium text-white hover:brightness-90 md:inline-block lg:px-7 lg:py-3 lg:text-[14px]">
            {t('nav.register')}
          </Link>
          <button ref={burger} type="button" aria-label={t(mobile ? 'common.close' : 'common.menu')} aria-expanded={mobile} aria-controls="mobile-menu" onClick={() => setMobile((m) => !m)} className="text-ink md:hidden">
            {mobile ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobile && (
        <nav id="mobile-menu" aria-label={t('common.mobileNav')} className="absolute inset-x-0 top-full border-t border-black/10 bg-white px-5 pb-5 shadow-lg md:hidden">
          <ul className="divide-y divide-black/10">
            {navGroups.map((g) => (
              <li key={g.key}>
                {g.items ? (
                  <>
                    <button type="button" aria-expanded={acc === g.key} onClick={() => setAcc(acc === g.key ? null : g.key)} className="flex w-full items-center justify-between py-3 text-sm font-medium">
                      {t(`nav.groups.${g.key}`)}
                      <ChevronDown className={`size-4 transition-transform ${acc === g.key ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {acc === g.key && (
                      <ul className="pb-2 pl-3">
                        {g.items.map((i) => <li key={i.key}><Link to={i.href} className="block py-2 text-[13px] text-ink/80">{t(`nav.items.${i.key}`)}{i.soon && <span className="ml-2 rounded-full bg-brand-orange px-2 py-0.5 text-[10px] text-white">{t('editions.soon')}</span>}</Link></li>)}
                      </ul>
                    )}
                  </>
                ) : <Link to={g.href!} className="block py-3 text-sm font-medium">{t(`nav.groups.${g.key}`)}</Link>}
              </li>
            ))}
          </ul>
          <Link to="/inscription" className="mt-4 block rounded-full bg-brand-orange py-3 text-center text-sm font-medium text-white">{t('nav.register')}</Link>
        </nav>
      )}
    </header>
  )
}