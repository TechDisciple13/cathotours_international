import { useTranslation } from 'react-i18next'
import DotsCarousel from '../components/DotsCarousel'
import ImageSlot from '../components/ImageSlot'
import SectionHeader from '../components/SectionHeader'
import { testimonials } from '../config/testimonials'

export default function Testimonials() {
  const { t } = useTranslation()

  const slides = testimonials.map((item) => (
    <div key={item.id} className="grid gap-4 md:grid-cols-2 md:gap-6">
      <figure className="flex flex-col justify-center rounded-lg border border-black/5 bg-white p-3 shadow-sm md:p-6">
        <div className="flex items-center gap-4">
          <ImageSlot src={item.avatar} alt={t('testimonials.avatarAlt')} label="Photo" className="size-14 shrink-0 rounded-full md:size-[120px]" />
          <div>
            <blockquote className="text-xs text-ink/80 md:text-[15px]">{item.quote ?? t('testimonials.quote')}</blockquote>
            <figcaption className="mt-2 text-[10px] md:text-xs">
              <span className="font-semibold">{item.author ?? t('testimonials.author')}</span>
              <span className="block text-ink/70">{item.role ?? t('testimonials.role')}</span>
            </figcaption>
          </div>
        </div>
      </figure>
      <ImageSlot src={item.image} alt={t('testimonials.imageAlt')} label="Image à fournir" className="aspect-[19/4] w-full rounded-lg md:aspect-auto md:h-full md:min-h-44" />
    </div>
  ))

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-5 md:px-10 xl:px-20 md:py-7">
      <SectionHeader to="/temoignages" title={t('testimonials.title')} seeAll={t('testimonials.seeAll')} seeAllShort={t('testimonials.seeAllShort')} />
      <div className="mt-4 md:mt-6">
        <DotsCarousel label={t('testimonials.title')} slides={slides} />
      </div>
    </section>
  )
}