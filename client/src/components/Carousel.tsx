import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface Props { label: string; children: ReactNode }

const btn = 'flex size-9 items-center justify-center rounded-full border border-brand-green text-brand-green transition hover:bg-brand-green hover:text-white disabled:pointer-events-none disabled:opacity-30'

export default function Carousel({ label, children }: Props) {
  const { t } = useTranslation()
  const track = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdges({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 })
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [update])

  const go = (dir: 1 | -1) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <div role="region" aria-roledescription={t('carousel.roleDescription')} aria-label={label}>
      <div className="mb-3 flex justify-end gap-2">
        <button type="button" aria-label={t('carousel.prev')} disabled={edges.start} onClick={() => go(-1)} className={btn}>
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button type="button" aria-label={t('carousel.next')} disabled={edges.end} onClick={() => go(1)} className={btn}>
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
      <ul
        ref={track}
        onScroll={update}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] md:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </div>
  )
}