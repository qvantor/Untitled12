import { zeroToMax, color } from './Params.types'

export const AmbientLight = [
  { name: 'Color', key: 'color', type: color, pos: 0 },
  { name: 'Intensity', key: 'intensity', type: zeroToMax, pos: 1 },
]

export const DirectionalLight = [
  { name: 'Color', key: 'color', type: color, pos: 0 },
  { name: 'Intensity', key: 'intensity', type: zeroToMax, pos: 1 },
]

export const PointLight = [
  { name: 'Color', key: 'color', type: color, pos: 0 },
  { name: 'Intensity', key: 'intensity', type: zeroToMax, pos: 1 },
  { name: 'Distance', key: 'distance', type: zeroToMax, pos: 2 },
  { name: 'Decay', key: 'decay', type: zeroToMax, pos: 3 },
]
