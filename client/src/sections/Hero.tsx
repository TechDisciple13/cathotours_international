import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import { heroMarkers } from '../config/heroMarkers'

const tones = { green: 'bg-brand-green', orange: 'bg-brand-orange' }

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="bg-surface/50">
      <div className="mx-auto grid max-w-[1440px] gap-5 px-5 pb-6 pt-3 md:grid-cols-[minmax(0,4fr)_minmax(0,5fr)] md:items-center md:gap-6 md:px-10 xl:px-20 md:pb-10 md:pt-8">
        <div>
          <p className="text-xs italic text-brand-green md:text-[13px]">{t('hero.eyebrow')}</p>
          <h1 className="mt-2 text-[21px] font-semibold leading-tight text-brand-green md:mt-3 text-balance md:text-[clamp(26px,2.65vw,40px)]">
            {t('hero.title')}
          </h1>
          <p className="mt-4 max-w-md text-xs leading-relaxed md:mt-6 md:text-[15px]">{t('hero.text')}</p>
          <div className="mt-5 flex flex-wrap gap-3 md:mt-8">
            <Link
              to="/editions"
              className="rounded-full bg-brand-orange px-4 py-2 text-xs font-medium text-white md:px-7 md:py-3 md:text-[13px]"
            >
              {t('hero.ctaPrimary')}
            </Link>
            <Link
              to="/#about"
              className="rounded-full border border-brand-green px-4 py-2 text-xs font-medium text-brand-green md:px-7 md:py-3 md:text-[13px]"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>

        <div className="relative -mx-5 aspect-[230/177] w-[calc(100%+2.5rem)] md:-ml-12 md:mr-0 md:aspect-[415/260] md:w-[calc(100%+3rem)]">
          <div className="absolute inset-x-0 top-0 aspect-[1586/815]" aria-hidden="true">
            <img src="/assets/images/carte-monde.png" alt="" className="size-full" />
            {heroMarkers.map((m, i) => (
              <span
                key={i}
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
                className={`absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-white md:size-2 ${tones[m.tone]}`}
              />
            ))}
          </div>

          <ImageSlot
            src="/assets/images/hero-groupe-jeunes.jpg"
            alt={t('hero.imageAlt.group')}
            label="Image 1 à fournir"
            className="absolute left-[40%] top-[26%] w-[30%] aspect-[1.25] rounded-md shadow-md md:left-[52%] md:top-[4%] md:w-[32%] md:aspect-[1.45] md:rounded-lg"
          />
          <ImageSlot
            src="/assets/images/hero-rencontre-culturelle.jpg"
            alt={t('hero.imageAlt.culture')}
            label="Image 2 à fournir"
            className="absolute left-[4%] top-[55%] w-[40%] aspect-[1.4] rounded-md shadow-md md:left-[35%] md:top-[56%] md:w-[30%] md:aspect-[1.25] md:rounded-lg"
          />
          <ImageSlot
            src="/assets/images/hero-edifice-religieux.jpg"
            alt={t('hero.imageAlt.landmark')}
            label="Image 3 à fournir"
            className="absolute left-[48%] top-[53%] w-[42%] aspect-[1.4] rounded-md shadow-md md:left-[68%] md:top-[38%] md:w-[28%] md:aspect-square md:rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
