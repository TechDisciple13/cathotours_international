import { useTranslation } from 'react-i18next'
import type { Testimonial } from '../config/testimonials'
import ImageSlot from './ImageSlot'

export default function TestimonialCard({ item }: { item: Testimonial }) {
  const { t } = useTranslation()
  return (
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
  )
}