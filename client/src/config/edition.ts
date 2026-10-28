// Éditions = voyages effectués (ou à venir) par pays. Pour ajouter un pays : une ligne ici,
// puis son nom dans les traductions (editions.items.<key> et nav.items.<key>) et un lien dans navLinks.ts.
// Photos : /assets/images/editions/<slug>/photo-1.jpg à photo-8.jpg
export interface Edition {
  key: 'benin' | 'ghana' | 'cotedivoire' | 'senegal'
  slug: string
  path: string
  image: string
  soon?: boolean
}

const edition = (key: Edition['key'], slug: string, soon = false): Edition => ({
  key, slug, soon, path: `/editions/${slug}`, image: `/assets/images/edition-${slug}.jpg`,
})

export const editions: Edition[] = [
  edition('benin', 'benin'),
  edition('ghana', 'ghana'),
  edition('cotedivoire', 'cote-divoire'),
  edition('senegal', 'senegal', true),
]

export const PHOTOS_PER_EDITION = 8