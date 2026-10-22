import { useEffect } from 'react'

const BRAND = 'Catho Tours International'

export function usePageTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title === BRAND ? BRAND : `${title} | ${BRAND}`
    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }
    return () => { document.title = BRAND }
  }, [title, description])
}
