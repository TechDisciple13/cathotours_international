// Emplacements de témoignages : à remplacer par les témoignages validés.
// Renseigner quote, author et role pour afficher un vrai témoignage ; sinon le texte provisoire s'affiche.
export interface Testimonial {
  id: number
  avatar: string
  image: string
  quote?: string
  author?: string
  role?: string
}

export const testimonials: Testimonial[] = [1, 2, 3, 4].map((id) => ({
  id,
  avatar: `/assets/images/temoignage-participant-${id}.jpg`,
  image: `/assets/images/temoignage-voyageurs-${id}.jpg`,
}))
