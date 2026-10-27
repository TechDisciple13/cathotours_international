import { Fragment, type ReactNode } from 'react'

// Met en évidence les mentions [à compléter] pour qu'elles ne passent pas inaperçues.
export function highlight(text: string): ReactNode {
  return text.split(/(\[[^\]]+\])/g).map((part, i) =>
    part.startsWith('[') ? <mark key={i} className="rounded bg-[#FFF3CD] px-1 font-medium text-ink">{part}</mark> : <Fragment key={i}>{part}</Fragment>,
  )
}
