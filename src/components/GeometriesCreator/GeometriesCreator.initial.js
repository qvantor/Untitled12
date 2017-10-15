const material = {
  type: 'meshBasicMaterial',
  color: 0x00ff00,
}

const position = [0, 0, 0]
const rotation = [0, 0, 0]
const scale = [1, 1, 1]

export const box = {
  type: 'boxGeometry',
  params: [1, 1, 1, 1, 1, 1],
  position,
  rotation,
  scale,
  material,
}

export const cylinder = {
  type: 'cylinderGeometry',
  params: [1, 1, 1, 8, 8, 0, 6.3],
  position,
  rotation,
  scale,
  material,
}

export const sphere = {
  type: 'sphereGeometry',
  params: [1, 8, 8, 0, 6.3, 0, 3.1],
  position,
  rotation,
  scale,
  material,
}

export const torus = {
  type: 'torusGeometry',
  params: [1, 0.5, 8, 6, 6.3],
  position,
  rotation,
  scale,
  material,
}

export const plane = {
  type: 'planeGeometry',
  params: [1, 1, 1, 1],
  position,
  rotation,
  scale,
  material,
}

export const circle = {
  type: 'circleGeometry',
  params: [1, 8, 0, 6.3],
  position,
  rotation,
  scale,
  material,
}
