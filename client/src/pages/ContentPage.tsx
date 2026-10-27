import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import PageHeader from '../components/PageHeader'
import RichText from '../components/RichText'
import { contactEmail } from '../config/footerLinks'
import type { PageDef } from '../config/pages'
import { usePageTitle } from '../hooks/usePageTitle'
import { highlight } from '../utils/highlight'

export default function ContentPage({ page }: { page: PageDef }) {
  const { t } = useTranslation()
  const title = t(page.titleKey)
  usePageTitle(title)
  const intro = t(`pages.${page.id}.intro`, { defaultValue: t('pages.default.intro') })
  const body = t(`pages.${page.id}.body`, { defaultValue: t('pages.default.body') })

  return (
    <>
      <PageHeader breadcrumb={t('register.breadcrumb')} title={title} intro={highlight(intro)} />
      <article className="mx-auto max-w-3xl px-5 py-8 text-sm leading-relaxed md:px-10 md:py-12 md:text-base">
        {page.id === 'legal' && <p lang="fr" className="mb-6 rounded-lg border border-[#E0B84A] bg-[#FFF8E1] p-3 text-xs">{t('pages.draftNotice', { lng: 'fr' })}</p>}
        <ImageSlot src={`/assets/images/page-${page.id}.jpg`} alt="" label="Image à fournir" className="mb-6 aspect-[21/8] w-full rounded-lg" />
        <RichText text={body} />
        {page.event && (
          <Link to={`/inscription?event=${encodeURIComponent(page.event)}`} className="mt-8 inline-block rounded-full bg-brand-orange px-7 py-3 text-sm font-medium text-white hover:brightness-90">
            {t('pages.registerCta')}
          </Link>
        )}
        {page.kind === 'contact' && (
          <a href={`mailto:${contactEmail}`} className="mt-8 inline-flex max-w-full items-center gap-2 break-all rounded-2xl bg-brand-orange px-5 py-3 text-xs font-medium text-white hover:brightness-90 md:rounded-full md:px-7 md:text-sm">
            <Mail className="size-4" aria-hidden="true" />
            {contactEmail}
          </a>
        )}
      </article>
    </>
  )
}
