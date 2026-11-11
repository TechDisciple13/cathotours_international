// Témoignages. Chaque témoignage appartient à une édition (un pays) et à un numéro dans cette édition :
//   make(id, 'benin', 1) utilise editions/bn/t1.jpg (portrait rond) et editions/bn/s1.jpg (grande image)
// Pour afficher un vrai témoignage validé, renseigner quote, author et role, par exemple :
//   make(1, 'benin', 1, { quote: '...', author: 'Prénom', role: 'Participant, édition du Bénin' })
// Les quatre lignes ci-dessous sont des emplacements neutres à remplacer. Les premiers (4 maximum) passent sur l'accueil.
import { editions, type Edition } from './edition'
import { img } from './images'

export interface Testimonial {
  id: number
  edition: Edition['key']
  avatar: string
  image: string
  quote?: string
  author?: string
  role?: string
}

type Extra = Pick<Testimonial, 'quote' | 'author' | 'role'>

const make = (id: number, edition: Edition['key'], n: number, extra: Extra = {}): Testimonial => {
  const code = editions.find((e) => e.key === edition)?.code ?? ''
  return { id, edition, avatar: img.testimonialPortrait(code, n), image: img.testimonialScene(code, n), ...extra }
}

export const testimonials: Testimonial[] = [
  make(1, 'benin', 1),
  make(2, 'benin', 2),
  make(3, 'ghana', 1),
  make(4, 'cotedivoire', 1),
]