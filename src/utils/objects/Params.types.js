import * as THREE from 'three'

export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991

export const initialSize = 10

export const usualNumber = { name: 'number', min: 0.001, max: MAX_SAFE_INTEGER }
export const zeroToMax = { name: 'number', min: 0, max: MAX_SAFE_INTEGER }
export const zeroToOne = { name: 'number', min: 0, max: 1 }
export const usualSegments = { name: 'number', min: 1, max: 64, integer: true }
export const usualTheta = { name: 'number', min: 0, max: 6 }
export const usualThetaLength = { name: 'number', min: 0, max: 6.3 }

export const color = { name: 'color', format: 'numeric' }
export const position = { name: 'position' }
export const boolean = { name: 'boolean' }
export const side = {
  name: 'selector',
  options: [
    {
      value: '0',
      name: 'Front side',
      realVal: THREE.FrontSide,
    },
    {
      value: '1',
      name: 'Back side',
      realVal: THREE.BackSide,
    },
    {
      value: '2',
      name: 'Double side',
      realVal: THREE.DoubleSide,
    }],
}
