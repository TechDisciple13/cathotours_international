import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function ComingSoon() {
  const { t } = useTranslation()
  usePageTitle(t('comingSoon.title'))
  return (
    <section className="mx-auto flex max-w-[1440px] flex-col items-center px-5 py-20 text-center md:py-32">
      <h1 className="text-2xl font-semibold text-brand-green md:text-4xl">{t('comingSoon.title')}</h1>
      <p className="mt-4 max-w-md text-sm text-ink/70">{t('comingSoon.text')}</p>
      <Link to="/" className="mt-8 rounded-full bg-brand-orange px-7 py-3 text-sm font-medium text-white hover:brightness-90">{t('comingSoon.back')}</Link>
    </section>
  )
}
