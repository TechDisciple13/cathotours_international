import { useTranslation } from 'react-i18next'
import EditionCard from '../components/EditionCard'
import PageHeader from '../components/PageHeader'
import { editions } from '../config/edition'
import type { PageDef } from '../config/pages'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Editions({ page }: { page: PageDef }) {
  const { t } = useTranslation()
  const title = t(page.titleKey)
  usePageTitle(title)

  return (
    <>
      <PageHeader breadcrumb={t('register.breadcrumb')} title={title} intro={t('pages.editions.intro')} />
      <section className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-12 xl:px-20">
        <ul className="grid gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {editions.map((e) => <li key={e.key}><EditionCard edition={e} large /></li>)}
        </ul>
      </section>
    </>
  )
}