import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../hooks/usePageTitle'
import Destinations from '../sections/Destinations'
import Hero from '../sections/Hero'
import News from '../sections/News'
import Newsletter from '../sections/Newsletter'
import Testimonials from '../sections/Testimonials'

export default function Home() {
  const { t } = useTranslation()
  usePageTitle(t('common.brandName'), t('seo.home'))
  return (
    <>
      <Hero />
      <Destinations />
      <News />
      <Testimonials />
      <Newsletter />
    </>
  )
}
