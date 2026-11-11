// Noms d'images courts, centralisés ici : un seul endroit à modifier si un nom ou un format change.
// Tous les fichiers se déposent dans client/public/assets/images/
//   logo.png  map.png  h1.jpg h2.jpg h3.jpg  n1..n4.jpg
//   editions/<code>/cover.jpg, 1.jpg à 8.jpg, t1.jpg.. (portraits), s1.jpg.. (grandes images)   (code : bn, gh, ci, sn)
const BASE = '/assets/images'
export const PHOTO_EXT = 'jpg' // passer à 'webp' une fois les images converties

export const img = {
  logo: `${BASE}/logo.png`,
  map: `${BASE}/map.png`,
  hero: [1, 2, 3].map((n) => `${BASE}/h${n}.${PHOTO_EXT}`),
  news: (n: number) => `${BASE}/n${n}.${PHOTO_EXT}`,
  // témoignages : rangés dans le dossier de leur édition (t = portrait rond, s = grande image)
  testimonialPortrait: (code: string, n: number) => `${BASE}/editions/${code}/t${n}.${PHOTO_EXT}`,
  testimonialScene: (code: string, n: number) => `${BASE}/editions/${code}/s${n}.${PHOTO_EXT}`,
  editionCover: (code: string) => `${BASE}/editions/${code}/cover.${PHOTO_EXT}`,
  editionPhoto: (code: string, n: number) => `${BASE}/editions/${code}/${n}.${PHOTO_EXT}`,
}