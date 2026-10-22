import { navGroups } from './navLinks'

// Pages annoncées dans le menu mais pas encore construites : elles affichent « Bientôt disponible ».
// Toute autre adresse affiche la page 404.
const implemented = new Set(['/', '/partenaires', '/inscription'])

export const plannedRoutes = [
  ...new Set([
    ...navGroups.flatMap((g) => (g.items ? g.items.map((i) => i.href) : g.href ? [g.href] : [])),
    '/actualites',
  ]),
].filter((href) => !href.includes('#') && !implemented.has(href))
