import { useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface Props { label: string; slides: ReactNode[] }

export default function DotsCarousel({ label, slides }: Props) {
  const { t } = useTranslation()
  const track = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const el = track.current
    if (el && el.clientWidth) setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  const goTo = (index: number) => {
    const el = track.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: index * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div role="region" aria-roledescription={t('carousel.roleDescription')} aria-label={label}>
      <ul
        ref={track}
        onScroll={onScroll}
        tabIndex={0}
        aria-label={label}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <li key={i} className="w-full shrink-0 snap-start p-1">
            <div role="group" aria-label={t('carousel.slide', { n: i + 1, total: slides.length })}>{slide}</div>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex justify-center">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={t('carousel.goTo', { n: i + 1, total: slides.length })}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => goTo(i)}
            className="flex size-6 items-center justify-center"
          >
            <span className={`size-1.5 rounded-full transition-colors ${i === active ? 'bg-brand-green' : 'bg-ink/50'}`} />
          </button>
        ))}
      </div>
    </div>
  )
}
