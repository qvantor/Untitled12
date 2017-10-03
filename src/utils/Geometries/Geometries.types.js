export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991

const usualNumber = { name: 'number', min: 0.001, max: MAX_SAFE_INTEGER }
const usualSegments = { name: 'number', min: 1, max: 64, integer: true }
const usualTheta = { name: 'number', min: 0, max: 6 }
const usualThetaLength = { name: 'number', min: 0, max: 6.3 }

export const boxGeometry = [
  { name: 'Width', key: 'width', type: usualNumber, pos: 0 },
  { name: 'Height', key: 'height', type: usualNumber, pos: 1 },
  { name: 'Deight', key: 'depth', type: usualNumber, pos: 2 },
]
export const cylinderGeometry = [
  { name: 'radiusTop', key: 'radiusTop', type: usualNumber, pos: 0 },
  { name: 'radiusBottom', key: 'radiusBottom', type: usualNumber, pos: 1 },
  { name: 'height', key: 'height', type: usualNumber, pos: 2 },
  { name: 'radialSegments', key: 'radialSegments', type: usualSegments, pos: 3 },
  { name: 'heightSegments', key: 'heightSegments', type: usualSegments, pos: 4 },
  // { name: 'openEnded', key: 'openEnded',},
  { name: 'thetaStart', key: 'thetaStart', type: usualTheta, pos: 5 },
  { name: 'thetaLength', key: 'thetaLength', type: usualThetaLength, pos: 6 },
]

export const sphereGeometry = [
  { name: 'radius', key: 'radius', type: usualNumber, pos: 0 },
  { name: 'widthSegments', key: 'widthSegments', type: usualSegments, pos: 1 },
  { name: 'heightSegments', key: 'heightSegments', type: usualSegments, pos: 2 },
  { name: 'phiStart', key: 'phiStart', type: usualTheta, pos: 3 },
  { name: 'phiLength', key: 'phiLength', type: usualThetaLength, pos: 4 },
  { name: 'thetaStart', key: 'thetaStart', type: usualTheta, pos: 5 },
  { name: 'thetaLength', key: 'thetaLength', type: usualThetaLength, pos: 6 },
]

export const torusGeometry = [
  { name: 'radius', key: 'radius', type: usualNumber, pos: 0 },
  { name: 'tube', key: 'tube', type: { type: 'number', min: 0, max: 1, number: 'fractional' }, pos: 1 },
  { name: 'radialSegments', key: 'radialSegments', type: usualSegments, pos: 2 },
  { name: 'tubularSegments', key: 'tubularSegments', type: usualSegments, pos: 3 },
  { name: 'arc', key: 'arc', type: usualThetaLength, pos: 4 },
]

export const planeGeometry = [
  { name: 'width', key: 'width', type: usualNumber, pos: 0 },
  { name: 'height', key: 'height', type: usualNumber, pos: 1 },
  { name: 'widthSegments', key: 'widthSegments', type: usualSegments, pos: 2 },
  { name: 'heightSegments', key: 'heightSegments', type: usualSegments, pos: 3 },
]

export const circleGeometry = [
  { name: 'radius', key: 'radius', type: usualNumber, pos: 0 },
  { name: 'segments', key: 'segments', type: usualSegments, pos: 1 },
  { name: 'thetaStart', key: 'thetaStart', type: usualTheta, pos: 2 },
  { name: 'thetaLength', key: 'thetaLength', type: usualThetaLength, pos: 3 },
]
