import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import PageHeader from '../components/PageHeader'
import { editions, PHOTOS_PER_EDITION } from '../config/edition'
import { testimonials } from '../config/testimonials'
import { usePageTitle } from '../hooks/usePageTitle'
import { highlight } from '../utils/highlight'
import NotFound from './NotFound'

export default function Edition() {
  const { t } = useTranslation()
  const { slug } = useParams()
  const edition = editions.find((e) => e.slug === slug)
  const name = edition ? t(`editions.items.${edition.key}`) : ''
  usePageTitle(name)
  if (!edition) return <NotFound />

  return (
    <>
      <PageHeader breadcrumb={t('register.breadcrumb')} title={name} intro={highlight(t('editions.intro', { name }))} />
      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-12 xl:px-20">
        <div className="relative">
          <ImageSlot src={edition.image} alt={t('editions.imageAlt', { name })} label="Image à fournir" className="aspect-[16/9] w-full rounded-lg md:aspect-[21/8]" />
          {edition.soon && <span className="absolute left-3 top-3 rounded-full bg-brand-orange px-3 py-1 text-xs font-medium text-white">{t('editions.soon')}</span>}
        </div>

        {edition.soon && (
          <aside className="mt-6 rounded-lg border border-brand-green/20 bg-surface p-4 md:p-6">
            <h2 className="text-base font-semibold text-brand-green md:text-lg">{t('editions.soonTitle')}</h2>
            <p className="mt-1 text-sm text-ink/80">{t('editions.soonText')}</p>
          </aside>
        )}

        <section className="mt-8 md:mt-12">
          <h2 className="text-lg font-semibold text-brand-green md:text-2xl">{t('editions.gallery')}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 md:mt-6 md:grid-cols-4 md:gap-5">
            {Array.from({ length: PHOTOS_PER_EDITION }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                <ImageSlot src={`/assets/images/editions/${edition.slug}/photo-${n}.jpg`} alt={t('editions.photoAlt', { name, n })} label={t('editions.photoLabel')} className="aspect-[4/3] w-full rounded-lg" />
              </li>
            ))}
          </ul>
        </section>

        {!edition.soon && (
          <section className="mt-8 md:mt-12">
            <h2 className="text-lg font-semibold text-brand-green md:text-2xl">{t('editions.testimonials')}</h2>
            <ul className="mt-4 grid gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
              {testimonials.slice(0, 2).map((item) => (
                <li key={item.id}>
                  <figure className="flex h-full items-center gap-4 rounded-lg border border-black/5 bg-white p-4 shadow-sm md:p-6">
                    <ImageSlot src={item.avatar} alt={t('testimonials.avatarAlt')} label="Photo" className="size-14 shrink-0 rounded-full md:size-24" />
                    <div>
                      <blockquote className="text-sm text-ink/80">{item.quote ?? t('testimonials.quote')}</blockquote>
                      <figcaption className="mt-2 text-xs">
                        <span className="font-semibold">{item.author ?? t('testimonials.author')}</span>
                        <span className="block text-ink/70">{item.role ?? t('testimonials.role')}</span>
                      </figcaption>
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
            <Link to="/temoignages" className="mt-6 inline-block rounded-full border border-brand-green px-6 py-2.5 text-[13px] font-medium text-brand-green hover:bg-brand-green hover:text-white">{t('editions.seeMore')}</Link>
          </section>
        )}

        {!edition.soon && (
          <Link to="/inscription" className="mt-10 inline-block rounded-full bg-brand-orange px-7 py-3 text-sm font-medium text-white hover:brightness-90">{t('nav.register')}</Link>
        )}
      </div>
    </>
  )
}