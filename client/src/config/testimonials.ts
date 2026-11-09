// Emplacements de témoignages : à remplacer par les témoignages validés.
// Renseigner quote, author et role pour afficher un vrai témoignage ; sinon le texte provisoire s'affiche.
import type { Edition } from './edition'
import { img } from './images'

export interface Testimonial {
  id: number
  edition?: Edition['key'] // pays de l'édition concernée, une fois confirmé
  avatar: string
  image: string
  quote?: string
  author?: string
  role?: string
}

export const testimonials: Testimonial[] = [1, 2, 3, 4].map((id) => ({
  id,
  avatar: img.portrait(id),
  image: img.scene(id),
}))