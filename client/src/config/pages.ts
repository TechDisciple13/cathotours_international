// Toutes les pages du site hors accueil, partenaires, inscription et confidentialité.
// Le contenu de chaque page se renseigne dans les fichiers de traduction (src/i18n/locales/*.json) :
//   "pages": { "<id>": { "intro": "...", "body": "..." } }
// Syntaxe du champ body : une ligne = un paragraphe ; "## Titre" = intertitre ; "- texte" = puce.
export interface PageDef {
  id: string
  path: string
  titleKey: string
  kind?: 'editions' | 'contact'
  event?: string
}

export const pages: PageDef[] = [
  { id: 'history', path: '/notre-histoire', titleKey: 'nav.items.history' },
  { id: 'team', path: '/equipe', titleKey: 'nav.items.team' },
  { id: 'members', path: '/membres', titleKey: 'nav.items.members' },
  { id: 'commitments', path: '/engagements', titleKey: 'nav.items.commitments' },
  { id: 'testimonials', path: '/temoignages', titleKey: 'nav.items.testimonials' },
  { id: 'volunteering', path: '/volontarisme', titleKey: 'nav.items.volunteering' },
  { id: 'peacePrize', path: '/prix-de-la-paix', titleKey: 'nav.items.peacePrize' },
  { id: 'ecclesial', path: '/impact-ecclesial', titleKey: 'nav.items.ecclesial' },
  { id: 'regional', path: '/programme-regional', titleKey: 'nav.items.regional' },
  { id: 'tourism', path: '/tourisme', titleKey: 'nav.items.tourism' },
  { id: 'whereWeAre', path: '/ou-sommes-nous', titleKey: 'nav.items.whereWeAre' },
  { id: 'editions', path: '/editions', titleKey: 'nav.items.allEditions', kind: 'editions' },
  { id: 'aftercatho', path: '/activites/aftercatho', titleKey: 'nav.items.aftercatho', event: 'AfterCatho' },
  { id: 'universel', path: '/activites/universel', titleKey: 'nav.items.universel', event: "L'Universel" },
  { id: 'peleVelo', path: '/activites/pele-velo', titleKey: 'nav.items.peleVelo', event: 'Pélé Vélo' },
  { id: 'news', path: '/actualites', titleKey: 'news.title' },
  { id: 'contact', path: '/contact', titleKey: 'footer.links.contact', kind: 'contact' },
  { id: 'legal', path: '/mentions-legales', titleKey: 'footer.legal.notices' },
]

export const editionPages = pages.filter((p) => p.event)
