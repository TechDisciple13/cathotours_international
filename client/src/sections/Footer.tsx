import { Mail, Minus, Plus } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { activityLinks, contactEmail, discoverLinks, legalLinks, type FooterLink } from '../config/footerLinks'

const networks: { name: string; icon: ReactNode }[] = [
  { name: 'X', icon: <path fill="currentColor" stroke="none" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
  { name: 'Instagram', icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" /></> },
  { name: 'Facebook', icon: <path fill="currentColor" stroke="none" d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" /> },
  { name: 'YouTube', icon: <><rect x="2" y="5" width="20" height="14" rx="4" /><path fill="currentColor" d="m10 9 5 3-5 3z" /></> },
]

function LinkList({ links, label }: { links: FooterLink[]; label: string }) {
  const { t } = useTranslation()
  return (
    <nav aria-label={label}>
      <ul className="space-y-1.5">
        {links.map((l) => (
          <li key={l.key} className="text-[11px] before:mr-1 before:text-ink/40 before:content-['·']">
            {l.href ? <Link to={l.href} className="hover:text-brand-green">{t(`footer.links.${l.key}`)}</Link> : <span>{t(`footer.links.${l.key}`)}</span>}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  const { t } = useTranslation()
  const [openCol, setOpenCol] = useState<string | null>(null)
  const columns = [
    { title: t('footer.discover'), links: discoverLinks },
    { title: t('footer.activities'), links: activityLinks },
  ]

  return (
    <footer className="bg-white">
      <div className="mx-auto grid max-w-[1440px] gap-4 px-5 py-5 md:grid-cols-[1.2fr_1fr_1fr_1.6fr] md:gap-10 md:px-10 xl:px-20 md:py-10">
        <div>
          <Logo />
          <p className="mt-3 max-w-[11rem] text-[11px] text-ink/80">{t('footer.tagline')}</p>
        </div>

        {columns.map((c) => (
          <div key={c.title} className="hidden md:block">
            <h3 className="hidden text-[11px] font-semibold md:mb-3 md:block">{c.title}</h3>
            <div className="hidden md:block"><LinkList links={c.links} label={c.title} /></div>
          </div>
        ))}

        <div className="hidden md:col-start-4 md:row-start-1 md:block">
          <h3 className="mb-3 text-[11px] font-semibold">{t('footer.contact')}</h3>
          <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 break-all text-[11px]">
            <Mail className="size-3.5 shrink-0 text-brand-green" aria-hidden="true" />
            {contactEmail}
          </a>
        </div>

        <div className="divide-y divide-black/10 border-y border-black/10 md:hidden">
          {[...columns.map((c) => ({ ...c, id: c.title })), { title: t('footer.contact'), id: 'contact', links: null }].map((p) => (
            <div key={p.id}>
              <button type="button" aria-expanded={openCol === p.id} aria-controls={`footer-${p.id}`} onClick={() => setOpenCol(openCol === p.id ? null : p.id)} className="flex w-full items-center justify-between py-1.5 text-[11px] font-semibold">
                {p.title}
                {openCol === p.id ? <Minus className="size-3.5" aria-hidden="true" /> : <Plus className="size-3.5" aria-hidden="true" />}
              </button>
              {openCol === p.id && (
                <div id={`footer-${p.id}`} className="pb-3">
                  {p.links ? <LinkList links={p.links} label={p.title} /> : (
                    <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 break-all text-[11px]">
                      <Mail className="size-3.5 shrink-0 text-brand-green" aria-hidden="true" />{contactEmail}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <ul aria-label={t('footer.social')} className="flex gap-2 md:col-start-4 md:row-start-1 md:mt-[4.5rem]">
          {networks.map((n) => (
            <li key={n.name}>
              <button type="button" aria-label={t('footer.socialOn', { network: n.name })} className="flex size-[22px] items-center justify-center rounded-[5px] border border-brand-green text-brand-green">
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">{n.icon}</svg>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-brand-green text-[9px] text-white md:text-[10px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-1.5 px-5 py-2 md:flex-row md:justify-between md:px-10 xl:px-20">
          <p>{t('footer.copyright')}</p>
          <ul className="flex items-center gap-2.5">
            {legalLinks.map((l, i) => (
              <li key={l.key} className={i > 0 ? 'border-l border-white/40 pl-2.5' : ''}>
                {l.href ? <Link to={l.href} className="hover:underline focus-visible:outline-white">{t(`footer.legal.${l.key}`)}</Link> : t(`footer.legal.${l.key}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
