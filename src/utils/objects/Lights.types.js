import { zeroToMax, color, position } from './Params.types'

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

// export const SpotLight = [
//   { name: 'Color', key: 'color', type: color, pos: 0 },
//   { name: 'Intensity', key: 'intensity', type: zeroToMax, pos: 1 },
//   { name: 'Distance', key: 'distance', type: zeroToMax, pos: 2 },
//   { name: 'Angle', key: 'angle', type: zeroToMax, pos: 3 },
//   { name: 'Penumbra', key: 'penumbra', type: zeroToMax, pos: 4 },
//   { name: 'Decay', key: 'decay', type: zeroToMax, pos: 5 },
//   { name: 'Target', key: 'lookAt', type: position, pos: 5 },
// ]
