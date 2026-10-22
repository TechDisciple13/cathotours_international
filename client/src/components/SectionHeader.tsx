import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Props { to: string; title: string; seeAll: string; seeAllShort: string }

export default function SectionHeader({ to, title, seeAll, seeAllShort }: Props) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="text-lg font-semibold text-brand-green md:text-[clamp(22px,2.35vw,34px)]">{title}</h2>
      <Link to={to} className="flex shrink-0 items-center gap-1 text-[10px] text-brand-green underline md:text-xs">
        <span className="md:hidden">{seeAllShort}</span>
        <span className="hidden md:inline">{seeAll}</span>
        <ArrowRight className="hidden size-3.5 md:block" aria-hidden="true" />
      </Link>
    </div>
  )
}
