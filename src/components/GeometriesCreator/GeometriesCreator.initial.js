import { initialSize } from 'utils/objects/Params.types'

const material = {
  type: 'meshBasicMaterial',
  color: 0x00ff00,
}

const position = [0, 0, 0]
const rotation = [0, 0, 0]
const scale = [1, 1, 1]

export const box = {
  type: 'boxGeometry',
  params: [initialSize, initialSize, initialSize, 1, 1, 1],
  position,
  rotation,
  scale,
  material,
}

export const cylinder = {
  type: 'cylinderGeometry',
  params: [initialSize, initialSize, initialSize, 8, 8, 0, 6.3],
  position,
  rotation,
  scale,
  material,
}

export const sphere = {
  type: 'sphereGeometry',
  params: [initialSize, 8, 8, 0, 6.3, 0, 3.1],
  position,
  rotation,
  scale,
  material,
}

export const torus = {
  type: 'torusGeometry',
  params: [initialSize, 10, 8, 6, 6.3],
  position,
  rotation,
  scale,
  material,
}

export const plane = {
  type: 'planeGeometry',
  params: [initialSize, initialSize, 1, 1],
  position,
  rotation,
  scale,
  material,
}

export const circle = {
  type: 'circleGeometry',
  params: [initialSize, 8, 0, 6.3],
  position,
  rotation,
  scale,
  material,
}
