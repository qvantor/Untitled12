import { color, boolean, zeroToOne, side } from './Params.types'

export const meshBasicMaterial = {
  name: 'Mesh basic material',
  key: 'meshBasicMaterial',
  params: [
    { name: 'Color', key: 'color', type: color, pos: 0 },
    { name: 'Wireframe', key: 'wireframe', type: boolean, pos: 1 },
    { name: 'Transparent', key: 'transparent', type: boolean, pos: 2 },
    { name: 'Opacity', key: 'opacity', type: zeroToOne, pos: 3 },
    { name: 'Alpha Test', key: 'alphaTest', type: zeroToOne, pos: 4 },
    // { name: 'Side', key: 'side', type: side, pos: 5 },
  ],
}
