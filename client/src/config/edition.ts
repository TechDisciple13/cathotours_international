// Éditions = voyages effectués (ou à venir) par pays. Pour ajouter un pays : une ligne ici,
// puis son nom dans les traductions (editions.items.<key> et nav.items.<key>) et un lien dans navLinks.ts.
// Images : voir config/images.ts (editions/<code>/cover.jpg et 1.jpg à 8.jpg)
import { img } from './images'
export interface Edition {
  key: 'benin' | 'ghana' | 'cotedivoire' | 'senegal'
  slug: string
  code: string // code court des dossiers d'images
  path: string
  image: string
  soon?: boolean
}

const edition = (key: Edition['key'], slug: string, code: string, soon = false): Edition => ({
  key, slug, code, soon, path: `/editions/${slug}`, image: img.editionCover(code),
})

export const editions: Edition[] = [
  edition('benin', 'benin', 'bn'),
  edition('ghana', 'ghana', 'gh'),
  edition('cotedivoire', 'cote-divoire', 'ci'),
  edition('senegal', 'senegal', 'sn', true),
]

export const PHOTOS_PER_EDITION = 8