import { useTranslation } from 'react-i18next'
import ImageSlot from '../components/ImageSlot'
import SectionHeader from '../components/SectionHeader'
import { articles } from '../config/news'

export default function News() {
  const { t } = useTranslation()
  const main = articles[0]
  const title = (k: string) => t(`news.items.${k}.title`)

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-5 md:px-10 xl:px-20 md:py-7">
      <SectionHeader to="/actualites" title={t('news.title')} seeAll={t('news.seeAll')} seeAllShort={t('news.seeAllShort')} />
      <div className="mt-4 grid gap-6 md:mt-6 md:grid-cols-2 md:gap-8">
        <article className="hidden overflow-hidden rounded-lg border border-black/5 shadow-sm md:block">
          <ImageSlot src={main.image} alt={t('news.imageAlt', { title: title(main.key) })} label="Image à fournir" className="aspect-[11/4] w-full" />
          <div className="p-5">
            <span className="rounded bg-brand-green px-2 py-0.5 text-[10px] text-white">{t(`news.categories.${main.category}`)}</span>
            <h3 className="mt-3 text-base font-semibold">{title(main.key)}</h3>
            <p className="mt-2 text-xs text-ink/70">{t(`news.items.${main.key}.excerpt`)}</p>
          </div>
        </article>
        <ul className="flex flex-col divide-y divide-black/5 md:justify-between">
          {articles.map((a, i) => (
            <li key={a.key} className={`flex gap-3 py-2.5 first:pt-0 md:gap-4 md:py-4 ${i === 0 ? 'md:hidden' : ''} ${i === 1 ? 'md:pt-0' : ''}`}>
              <ImageSlot src={a.image} alt={t('news.imageAlt', { title: title(a.key) })} label="Image" className="aspect-[3/2] w-[92px] shrink-0 rounded-md md:w-40" />
              <div>
                <span className="rounded bg-surface px-1.5 py-0.5 text-[9px] text-ink/70 md:text-[10px]">{t(`news.categories.${a.category}`)}</span>
                <h3 className="mt-1.5 text-[11px] font-semibold md:text-[15px]">{title(a.key)}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
