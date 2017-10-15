import { usualNumber, color, position } from './Params.types'

export const AmbientLight = [
  { name: 'Color', key: 'color', type: color, pos: 0 },
  { name: 'Intensity', key: 'intensity', type: usualNumber, pos: 1 },
]

export const DirectionalLight = [
  { name: 'Color', key: 'color', type: color, pos: 0 },
  { name: 'Intensity', key: 'intensity', type: usualNumber, pos: 1 },
]
