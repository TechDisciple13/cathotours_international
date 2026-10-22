import { Fragment, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import { usePageTitle } from '../hooks/usePageTitle'

const sections = ['controller', 'data', 'purposes', 'basis', 'recipients', 'retention', 'rights', 'security', 'cookies', 'updated']

// Met en évidence les mentions [à compléter] pour qu'elles ne passent pas inaperçues.
function inline(text: string): ReactNode {
  return text.split(/(\[[^\]]+\])/g).map((part, i) =>
    part.startsWith('[') ? <mark key={i} className="rounded bg-[#FFF3CD] px-1 font-medium text-ink">{part}</mark> : <Fragment key={i}>{part}</Fragment>,
  )
}

function Body({ text }: { text: string }) {
  const out: ReactNode[] = []
  let items: string[] = []
  const flush = () => {
    if (!items.length) return
    out.push(<ul key={`u${out.length}`} className="mt-2 list-disc space-y-1 pl-5">{items.map((it) => <li key={it}>{inline(it)}</li>)}</ul>)
    items = []
  }
  for (const line of text.split('\n')) {
    if (line.startsWith('- ')) items.push(line.slice(2))
    else { flush(); out.push(<p key={`p${out.length}`} className="mt-2">{inline(line)}</p>) }
  }
  flush()
  return <>{out}</>
}

export default function Privacy() {
  const { t, i18n } = useTranslation()
  usePageTitle(t('privacy.title'), t('seo.privacy'))

  return (
    <>
      <PageHeader breadcrumb={t('register.breadcrumb')} title={t('privacy.title')} />
      <article className="mx-auto max-w-3xl px-5 py-8 text-sm leading-relaxed md:px-10 md:py-12 md:text-base">
        {i18n.language !== 'fr' && <p className="mb-4 rounded-lg border border-black/10 bg-surface p-3 text-xs">{t('privacy.frOnly')}</p>}
        <p lang="fr" className="mb-6 rounded-lg border border-[#E0B84A] bg-[#FFF8E1] p-3 text-xs">{t('privacy.draftNotice', { lng: 'fr' })}</p>
        {sections.map((id) => (
          <section key={id} lang="fr" aria-labelledby={`p-${id}`} className="mb-6">
            <h2 id={`p-${id}`} className="text-lg font-semibold text-brand-green md:text-xl">{t(`privacy.sections.${id}.title`, { lng: 'fr' })}</h2>
            <Body text={t(`privacy.sections.${id}.text`, { lng: 'fr' })} />
          </section>
        ))}
      </article>
    </>
  )
}
