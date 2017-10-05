export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991

const usualNumber = { name: 'number', min: 0.001, max: MAX_SAFE_INTEGER }
const usualSegments = { name: 'number', min: 1, max: 64, integer: true }
const usualTheta = { name: 'number', min: 0, max: 6 }
const usualThetaLength = { name: 'number', min: 0, max: 6.3 }

export const boxGeometry = [
  { name: 'Width', key: 'width', type: usualNumber, pos: 0 },
  { name: 'Height', key: 'height', type: usualNumber, pos: 1 },
  { name: 'Deight', key: 'depth', type: usualNumber, pos: 2 },
  { name: 'Width segments', key: 'widthSegments', type: usualSegments, pos: 3 },
  { name: 'Height segments', key: 'heightSegments', type: usualSegments, pos: 4 },
  { name: 'Depth segments', key: 'depthSegments', type: usualSegments, pos: 5 },
]
export const cylinderGeometry = [
  { name: 'Radius top', key: 'radiusTop', type: usualNumber, pos: 0 },
  { name: 'Radius bottom', key: 'radiusBottom', type: usualNumber, pos: 1 },
  { name: 'Height', key: 'height', type: usualNumber, pos: 2 },
  { name: 'Radial segments', key: 'radialSegments', type: usualSegments, pos: 3 },
  { name: 'Height segments', key: 'heightSegments', type: usualSegments, pos: 4 },
  // { name: 'openEnded', key: 'openEnded',},
  { name: 'Theta start', key: 'thetaStart', type: usualTheta, pos: 5 },
  { name: 'Theta length', key: 'thetaLength', type: usualThetaLength, pos: 6 },
]

export const sphereGeometry = [
  { name: 'Radius', key: 'radius', type: usualNumber, pos: 0 },
  { name: 'Width segments', key: 'widthSegments', type: usualSegments, pos: 1 },
  { name: 'Height segments', key: 'heightSegments', type: usualSegments, pos: 2 },
  { name: 'Phi start', key: 'phiStart', type: usualTheta, pos: 3 },
  { name: 'Phi length', key: 'phiLength', type: usualThetaLength, pos: 4 },
  { name: 'Theta start', key: 'thetaStart', type: usualTheta, pos: 5 },
  { name: 'Theta length', key: 'thetaLength', type: usualThetaLength, pos: 6 },
]

export const torusGeometry = [
  { name: 'Radius', key: 'radius', type: usualNumber, pos: 0 },
  { name: 'Tube', key: 'tube', type: { type: 'number', min: 0, max: 1, number: 'fractional' }, pos: 1 },
  { name: 'Radial segments', key: 'radialSegments', type: usualSegments, pos: 2 },
  { name: 'Tubular segments', key: 'tubularSegments', type: usualSegments, pos: 3 },
  { name: 'Arc', key: 'arc', type: usualThetaLength, pos: 4 },
]

export const planeGeometry = [
  { name: 'Width', key: 'width', type: usualNumber, pos: 0 },
  { name: 'Height', key: 'height', type: usualNumber, pos: 1 },
  { name: 'Width segments', key: 'widthSegments', type: usualSegments, pos: 2 },
  { name: 'Height segments', key: 'heightSegments', type: usualSegments, pos: 3 },
]

export const circleGeometry = [
  { name: 'Radius', key: 'radius', type: usualNumber, pos: 0 },
  { name: 'Segments', key: 'segments', type: usualSegments, pos: 1 },
  { name: 'Theta start', key: 'thetaStart', type: usualTheta, pos: 2 },
  { name: 'Theta length', key: 'thetaLength', type: usualThetaLength, pos: 3 },
]
