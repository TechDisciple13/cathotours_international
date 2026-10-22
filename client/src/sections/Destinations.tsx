import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ImageSlot from '../components/ImageSlot'
import SectionHeader from '../components/SectionHeader'
import { destinations } from '../config/destinations'

const arrow = 'absolute top-1/3 z-10 flex size-6 items-center justify-center rounded-full bg-white text-ink shadow md:hidden'

export default function Destinations() {
  const { t } = useTranslation()
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-4 md:px-10 xl:px-20 md:py-7">
      <SectionHeader to="/tourisme" title={t('destinations.title')} seeAll={t('destinations.seeAll')} seeAllShort={t('destinations.seeAllShort')} />
      <div className="relative">
        <span className={`${arrow} left-0 -translate-x-1/3`} aria-hidden="true"><ChevronLeft className="size-4" /></span>
        <span className={`${arrow} right-0 translate-x-1/3`} aria-hidden="true"><ChevronRight className="size-4" /></span>
        <ul tabIndex={0} aria-label={t('destinations.title')} className="-mx-5 mt-4 flex snap-x scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-6 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0">
          {destinations.map((d) => {
            const name = t(`destinations.items.${d.key}`)
            return (
              <li key={d.key} className="w-[43%] shrink-0 snap-start overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm md:w-auto">
                <ImageSlot src={d.image} alt={t('destinations.imageAlt', { name })} label="Image à fournir" className="aspect-[16/9] w-full md:aspect-[8/5]" />
                <div className="p-2.5 md:p-4">
                  <p className="text-xs font-semibold md:text-[15px]">{name}</p>
                  <p className="mt-0.5 text-[10px] text-ink/70 md:mt-1 md:text-xs">{t('destinations.region')}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
