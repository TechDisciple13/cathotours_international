export interface NavItem { key: string; href: string; soon?: boolean }
export interface NavGroup { key: 'about' | 'activities' | 'editions' | 'partners'; href?: string; items?: NavItem[] }

export const navGroups: NavGroup[] = [
  { key: 'about', items: [
    { key: 'identity', href: '/#about' }, { key: 'history', href: '/notre-histoire' }, { key: 'team', href: '/equipe' },
    { key: 'members', href: '/membres' }, { key: 'commitments', href: '/engagements' }, { key: 'whereWeAre', href: '/ou-sommes-nous' },
  ] },
  { key: 'activities', items: [
    { key: 'volunteering', href: '/volontarisme' }, { key: 'peacePrize', href: '/prix-de-la-paix' }, { key: 'ecclesial', href: '/impact-ecclesial' },
    { key: 'regional', href: '/programme-regional' }, { key: 'tourism', href: '/tourisme' }, { key: 'testimonials', href: '/temoignages' },
    { key: 'aftercatho', href: '/activites/aftercatho' }, { key: 'universel', href: '/activites/universel' }, { key: 'peleVelo', href: '/activites/pele-velo' },
  ] },
  { key: 'editions', items: [
    { key: 'benin', href: '/editions/benin' }, { key: 'ghana', href: '/editions/ghana' },
    { key: 'cotedivoire', href: '/editions/cote-divoire' }, { key: 'senegal', href: '/editions/senegal', soon: true },
  ] },
  { key: 'partners', href: '/partenaires' },
]