const position = [0, 0, 0]
const rotation = [0, 0, 0]
const scale = [1, 1, 1]

export const AmbientLight = {
  type: 'AmbientLight',
  params: ['#ffffff', 1],
  position,
  rotation,
  scale,
}

export const DirectionalLight = {
  type: 'DirectionalLight',
  params: ['#ffffff', 1, [0, 0, 0]],
  position,
  rotation,
  scale,
}
