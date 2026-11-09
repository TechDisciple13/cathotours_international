// Logo du site (barre de navigation et pied de page).
// Déposer le fichier dans client/public/assets/images/ puis, si besoin, adapter ces deux lignes.
import { img } from './images'

export const brand = {
  logoSrc: img.logo,
  // true si l'image du logo contient déjà le nom « Catho Tours International » : le texte à côté est alors masqué.
  logoIncludesName: true,
}