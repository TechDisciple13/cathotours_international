// Pays proposés pour l'indicatif téléphonique (ISO 3166 + indicatif). Togo par défaut.
export const countries = [
  { iso: 'TG', code: '+228' }, { iso: 'BJ', code: '+229' }, { iso: 'GH', code: '+233' }, { iso: 'CI', code: '+225' },
  { iso: 'SN', code: '+221' }, { iso: 'BF', code: '+226' }, { iso: 'ML', code: '+223' }, { iso: 'NE', code: '+227' },
  { iso: 'NG', code: '+234' }, { iso: 'CM', code: '+237' }, { iso: 'FR', code: '+33' }, { iso: 'DE', code: '+49' },
  { iso: 'ES', code: '+34' }, { iso: 'IT', code: '+39' }, { iso: 'CA', code: '+1' },
] as const

// Événements proposés : à confirmer avec la liste officielle.
export const events = ['AfterCatho', "L'Universel", 'Pélé Vélo'] as const

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const
