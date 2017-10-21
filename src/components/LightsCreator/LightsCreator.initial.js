const position = [0, 0, 0]
const rotation = [0, 0, 0]
const scale = [1, 1, 1]

const color = '#ffffff'

export const AmbientLight = {
  type: 'AmbientLight',
  params: [color, 1],
  position,
  rotation,
  scale,
}

export const DirectionalLight = {
  type: 'DirectionalLight',
  params: [color, 1],
  position,
  rotation,
  scale,
}

export const PointLight = {
  type: 'PointLight',
  params: [color, 1, 0, 1],
  position,
  rotation,
  scale,
}

// export const SpotLight = {
//   type: 'SpotLight',
//   params: [color, 1, 100, 1.0471, 0, 1],
//   position,
//   rotation,
//   scale,
// }
