export interface FooterLink { key: string; href?: string }

export const discoverLinks: FooterLink[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/#about' },
  { key: 'editions', href: '/editions' },
  { key: 'partners', href: '/partenaires' },
  { key: 'contact', href: '/contact' },
]
export const activityLinks: FooterLink[] = [
  { key: 'editions', href: '/editions' },
  { key: 'aftercatho', href: '/activites/aftercatho' },
  { key: 'universel', href: '/activites/universel' },
  { key: 'peleVelo', href: '/activites/pele-velo' },
]
export const legalLinks: FooterLink[] = [{ key: 'privacy', href: '/politique-de-confidentialite' }, { key: 'notices', href: '/mentions-legales' }]
export const contactEmail = 'photo26.cathotoursinternational@gmail.com'