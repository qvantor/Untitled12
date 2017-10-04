const material = {
  type: 'meshBasicMaterial',
  color: 0x00ff00,
}

const rotation = [0, 0, 0]

export const box = {
  type: 'boxGeometry',
  geometry: [1, 1, 1],
  position: [0, 0, 0],
  rotation,
  material,
}

export const cylinder = {
  type: 'cylinderGeometry',
  geometry: [1, 1, 1, 8, 8, 0, 6.3],
  position: [0, 0, 0],
  rotation,
  material,
}

export const sphere = {
  type: 'sphereGeometry',
  geometry: [1, 8, 8, 0, 6.3, 0, 3.1],
  position: [0, 0, 0],
  rotation,
  material,
}

export const torus = {
  type: 'torusGeometry',
  geometry: [1, 0.5, 8, 6, 6.3],
  position: [0, 0, 0],
  rotation,
  material,
}

export const plane = {
  type: 'planeGeometry',
  geometry: [1, 1, 1, 1],
  position: [0, 0, 0],
  rotation,
  material,
}

export const circle = {
  type: 'circleGeometry',
  geometry: [1, 8, 0, 6.3],
  position: [0, 0, 0],
  rotation,
  material,
}
