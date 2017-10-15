export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991

export const usualNumber = { name: 'number', min: 0.001, max: MAX_SAFE_INTEGER }
export const zeroToMax = { name: 'number', min: 0, max: MAX_SAFE_INTEGER }
export const usualSegments = { name: 'number', min: 1, max: 64, integer: true }
export const usualTheta = { name: 'number', min: 0, max: 6 }
export const usualThetaLength = { name: 'number', min: 0, max: 6.3 }

export const color = { name: 'color', format: 'numeric' }
