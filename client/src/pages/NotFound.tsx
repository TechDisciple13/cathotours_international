import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  const { t } = useTranslation()
  usePageTitle(t('notFound.title'))
  return (
    <section className="mx-auto flex max-w-[1440px] flex-col items-center px-5 py-20 text-center md:py-32">
      <p className="text-5xl font-semibold text-brand-orange md:text-7xl" aria-hidden="true">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-brand-green md:text-4xl">{t('notFound.title')}</h1>
      <p className="mt-4 max-w-md text-sm text-ink/70">{t('notFound.text')}</p>
      <Link to="/" className="mt-8 rounded-full bg-brand-orange px-7 py-3 text-sm font-medium text-white hover:brightness-90">{t('notFound.back')}</Link>
    </section>
  )
}
