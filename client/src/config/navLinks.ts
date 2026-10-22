export interface NavItem { key: string; href: string }
export interface NavGroup { key: 'about' | 'activities' | 'editions' | 'partners'; href?: string; items?: NavItem[] }

export const navGroups: NavGroup[] = [
  { key: 'about', items: [
    { key: 'identity', href: '/#about' }, { key: 'history', href: '/notre-histoire' }, { key: 'team', href: '/equipe' },
    { key: 'members', href: '/membres' }, { key: 'commitments', href: '/engagements' }, { key: 'testimonials', href: '/temoignages' },
  ] },
  { key: 'activities', items: [
    { key: 'volunteering', href: '/volontarisme' }, { key: 'peacePrize', href: '/prix-de-la-paix' }, { key: 'ecclesial', href: '/impact-ecclesial' },
    { key: 'regional', href: '/programme-regional' }, { key: 'tourism', href: '/tourisme' }, { key: 'whereWeAre', href: '/ou-sommes-nous' },
  ] },
  { key: 'editions', items: [
    { key: 'allEditions', href: '/editions' }, { key: 'aftercatho', href: '/activites/aftercatho' },
    { key: 'universel', href: '/activites/universel' }, { key: 'peleVelo', href: '/activites/pele-velo' },
  ] },
  { key: 'partners', href: '/partenaires' },
]
