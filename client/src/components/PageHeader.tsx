import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface Props { breadcrumb: string; title: string; intro?: string }

export default function PageHeader({ breadcrumb, title, intro }: Props) {
  const { t } = useTranslation()
  return (
    <div className="bg-surface/50">
      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-14 xl:px-20">
        <nav aria-label={t('common.breadcrumb')} className="flex items-center gap-1 text-[11px] text-ink/70 md:text-xs">
          <Link to="/" className="hover:text-brand-green">{breadcrumb}</Link>
          <ChevronRight className="size-3" aria-hidden="true" />
          <span aria-current="page" className="text-ink">{title}</span>
        </nav>
        <h1 className="mt-3 text-[26px] font-semibold text-brand-green md:text-4xl">{title}</h1>
        {intro && <p className="mt-3 max-w-2xl text-sm leading-relaxed md:mt-4 md:text-base">{intro}</p>}
      </div>
    </div>
  )
}
