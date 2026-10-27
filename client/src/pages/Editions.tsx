import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import PageHeader from '../components/PageHeader'
import { editionPages, type PageDef } from '../config/pages'
import { usePageTitle } from '../hooks/usePageTitle'
import { highlight } from '../utils/highlight'

export default function Editions({ page }: { page: PageDef }) {
  const { t } = useTranslation()
  const title = t(page.titleKey)
  usePageTitle(title)
  const intro = t(`pages.${page.id}.intro`, { defaultValue: t('pages.default.intro') })

  return (
    <>
      <PageHeader breadcrumb={t('register.breadcrumb')} title={title} intro={highlight(intro)} />
      <section className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-12 xl:px-20">
        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {editionPages.map((e) => (
            <li key={e.id} className="flex flex-col overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm">
              <ImageSlot src={`/assets/images/page-${e.id}.jpg`} alt="" label="Image à fournir" className="aspect-[16/10] w-full" />
              <div className="flex flex-1 flex-col p-4 md:p-5">
                <h2 className="text-lg font-semibold text-brand-green">{t(e.titleKey)}</h2>
                <p className="mt-2 flex-1 text-sm text-ink/80">{highlight(t(`pages.${e.id}.summary`, { defaultValue: t('pages.default.summary') }))}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link to={e.path} className="rounded-full border border-brand-green px-5 py-2 text-[13px] font-medium text-brand-green hover:bg-brand-green hover:text-white">{t('pages.learnMore')}</Link>
                  <Link to={`/inscription?event=${encodeURIComponent(e.event ?? '')}`} className="rounded-full bg-brand-orange px-5 py-2 text-[13px] font-medium text-white hover:brightness-90">{t('nav.register')}</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
