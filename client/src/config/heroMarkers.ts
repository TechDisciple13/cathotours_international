export type MarkerTone = 'green' | 'orange'

export interface MapMarker {
  x: number
  y: number
  tone: MarkerTone
}

// Positions en % de la carte (carte-monde.png). Provisoires : liste des pays à confirmer.
export const heroMarkers: MapMarker[] = [
  { x: 19.5, y: 26.0, tone: 'green' },
  { x: 45.6, y: 33.9, tone: 'green' },
  { x: 48.9, y: 29.6, tone: 'green' },
  { x: 44.2, y: 39.5, tone: 'orange' },
  { x: 50.1, y: 36.9, tone: 'orange' },
  { x: 43.4, y: 54.0, tone: 'green' },
  { x: 42.1, y: 55.5, tone: 'green' },
  { x: 44.8, y: 56.7, tone: 'green' },
  { x: 41.2, y: 58.5, tone: 'green' },
  { x: 42.3, y: 59.8, tone: 'green' },
  { x: 44.6, y: 60.2, tone: 'green' },
  { x: 45.9, y: 58.5, tone: 'green' },
  { x: 49.6, y: 54.6, tone: 'green' },
  { x: 49.1, y: 59.6, tone: 'green' },
  { x: 48.2, y: 64.9, tone: 'orange' },
]
