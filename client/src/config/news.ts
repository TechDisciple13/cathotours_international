import { img } from './images'

// Données de démonstration : à remplacer par les actualités officielles.
export const articles = [
  { key: 'n1', category: 'testimonials', image: img.news(1), date: null },
  { key: 'n2', category: 'news', image: img.news(2), date: null },
  { key: 'n3', category: 'story', image: img.news(3), date: null },
  { key: 'n4', category: 'news', image: img.news(4), date: null },
] as const