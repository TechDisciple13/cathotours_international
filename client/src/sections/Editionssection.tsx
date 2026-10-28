import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import EditionCard from '../components/EditionCard'
import SectionHeader from '../components/SectionHeader'
import { editions } from '../config/edition'

const arrow = 'absolute top-1/3 z-10 flex size-6 items-center justify-center rounded-full bg-white text-ink shadow md:hidden'

export default function EditionsSection() {
  const { t } = useTranslation()
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-4 md:px-10 xl:px-20 md:py-7">
      <SectionHeader to="/editions" title={t('editions.title')} seeAll={t('editions.seeAll')} seeAllShort={t('editions.seeAllShort')} />
      <div className="relative">
        <span className={`${arrow} left-0 -translate-x-1/3`} aria-hidden="true"><ChevronLeft className="size-4" /></span>
        <span className={`${arrow} right-0 translate-x-1/3`} aria-hidden="true"><ChevronRight className="size-4" /></span>
        <ul tabIndex={0} aria-label={t('editions.title')} className="-mx-5 mt-4 flex snap-x scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-6 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0">
          {editions.map((e) => (
            <li key={e.key} className="w-[43%] shrink-0 snap-start md:w-auto"><EditionCard edition={e} /></li>
          ))}
        </ul>
      </div>
    </section>
  )
}