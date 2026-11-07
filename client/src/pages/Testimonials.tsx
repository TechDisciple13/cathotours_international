import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import TestimonialCard from '../components/TestimonialCard'
import { editions } from '../config/edition'
import type { PageDef } from '../config/pages'
import { testimonials } from '../config/testimonials'
import { usePageTitle } from '../hooks/usePageTitle'

const chip = 'rounded-full border px-4 py-1.5 text-[13px] font-medium'

export default function Testimonials({ page }: { page: PageDef }) {
  const { t } = useTranslation()
  const title = t(page.titleKey)
  usePageTitle(title)
  const [params] = useSearchParams()
  const current = editions.find((e) => e.slug === params.get('edition'))
  const list = current ? testimonials.filter((x) => x.edition === current.key) : testimonials

  return (
    <>
      <PageHeader breadcrumb={t('register.breadcrumb')} title={title} intro={t('pages.testimonials.intro')} />
      <section className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-12 xl:px-20">
        <nav aria-label={t('testimonials.filterLabel')} className="flex flex-wrap gap-2">
          <Link to="/temoignages" aria-current={!current ? 'page' : undefined} className={`${chip} ${!current ? 'border-brand-green bg-brand-green text-white' : 'border-brand-green text-brand-green hover:bg-brand-green/10'}`}>{t('testimonials.filterAll')}</Link>
          {editions.filter((e) => !e.soon).map((e) => (
            <Link key={e.key} to={`/temoignages?edition=${e.slug}`} aria-current={current?.key === e.key ? 'page' : undefined} className={`${chip} ${current?.key === e.key ? 'border-brand-green bg-brand-green text-white' : 'border-brand-green text-brand-green hover:bg-brand-green/10'}`}>
              {t(`editions.items.${e.key}`)}
            </Link>
          ))}
        </nav>
        {list.length ? (
          <ul className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
            {list.map((item) => <li key={item.id}><TestimonialCard item={item} /></li>)}
          </ul>
        ) : <p className="mt-8 text-sm text-ink/70">{t('testimonials.empty')}</p>}
      </section>
    </>
  )
}