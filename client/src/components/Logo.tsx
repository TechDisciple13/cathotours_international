import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { brand } from '../config/brand'
import ImageSlot from './ImageSlot'

export default function Logo() {
  const { t } = useTranslation()
  return (
    <Link to="/" className="flex items-center gap-2">
      <ImageSlot
        src={brand.logoSrc}
        alt={brand.logoIncludesName ? t('common.brandName') : ''}
        label="Logo"
        className="h-9 min-w-9 w-auto shrink-0 object-contain md:h-10 md:min-w-10 lg:h-14 lg:min-w-14"
      />
    </Link>
  )
}