import { useTranslation } from 'react-i18next'
import Carousel from '../components/Carousel'
import ImageSlot from '../components/ImageSlot'
import PageHeader from '../components/PageHeader'
import { contactEmail } from '../config/footerLinks'
import { partners } from '../config/partners'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Partners() {
  const { t } = useTranslation()
  usePageTitle(t('partners.title'), t('seo.partners'))

  return (
    <>
      <PageHeader breadcrumb={t('partners.breadcrumb')} title={t('partners.title')} intro={t('partners.intro')} />

      <section aria-labelledby="partners-list" className="mx-auto max-w-[1440px] px-5 py-8 md:px-10 md:py-12 xl:px-20">
        <h2 id="partners-list" className="text-lg font-semibold text-brand-green md:text-2xl">{t('partners.listTitle')}</h2>
        <div className="mt-4 md:mt-6">
          <Carousel label={t('partners.listTitle')}>
            {partners.map((p) => (
              <li key={p.id} className="flex aspect-[3/2] shrink-0 basis-[calc((100%-0.75rem)/2)] snap-start items-center justify-center rounded-lg border border-black/5 bg-white p-4 shadow-sm md:basis-[calc((100%-2.5rem)/3)] lg:basis-[calc((100%-3.75rem)/4)]">
                <ImageSlot src={p.logo} alt={t('partners.logoAlt', { n: p.id })} label={t('partners.logoLabel')} className="size-full rounded-md object-contain" />
              </li>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="bg-brand-green text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-10 md:py-8 xl:px-20">
          <div>
            <h2 className="text-base font-semibold md:text-xl">{t('partners.joinTitle')}</h2>
            <p className="mt-1 max-w-xl text-xs md:text-sm">{t('partners.joinText')}</p>
          </div>
          <a href={`mailto:${contactEmail}`} className="self-start rounded-full bg-brand-orange px-7 py-3 text-[13px] font-medium hover:brightness-90 md:self-auto">
            {t('partners.joinButton')}
          </a>
        </div>
      </section>
    </>
  )
}
