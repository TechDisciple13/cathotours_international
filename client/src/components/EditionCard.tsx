import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { Edition } from '../config/edition'
import ImageSlot from './ImageSlot'

export default function EditionCard({ edition, large = false }: { edition: Edition; large?: boolean }) {
  const { t } = useTranslation()
  const name = t(`editions.items.${edition.key}`)
  return (
    <Link to={edition.path} className="group block h-full overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm focus-visible:outline-2 focus-visible:outline-brand-green">
      <div className="relative">
        <ImageSlot src={edition.image} alt={t('editions.imageAlt', { name })} label="Image à fournir" className={`w-full ${large ? 'aspect-[16/10]' : 'aspect-[16/9] md:aspect-[8/5]'}`} />
        {edition.soon && <span className="absolute left-2 top-2 rounded-full bg-brand-orange px-2.5 py-0.5 text-[10px] font-medium text-white md:text-xs">{t('editions.soon')}</span>}
      </div>
      <div className={large ? 'p-4 md:p-5' : 'p-2.5 md:p-4'}>
        <p className={`font-semibold ${large ? 'text-lg text-brand-green' : 'text-xs md:text-[15px]'}`}>{name}</p>
        <p className={`text-ink/70 ${large ? 'mt-1 text-sm' : 'mt-0.5 text-[10px] md:mt-1 md:text-xs'}`}>{t('editions.region')}</p>
        {large && <span className="mt-4 inline-block rounded-full border border-brand-green px-5 py-2 text-[13px] font-medium text-brand-green group-hover:bg-brand-green group-hover:text-white">{t('pages.learnMore')}</span>}
      </div>
    </Link>
  )
}