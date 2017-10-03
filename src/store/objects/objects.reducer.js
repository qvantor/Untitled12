import * as constants from './objects.constants'
import Model from './objects.model'

export default function objects (state = Model, { type, payload }) {
  switch (type) {
    case constants.OBJECTS_GEOMETRY_ADDED:
      return state.merge({ geometries: [...state.geometries, ...[payload]] })

    case constants.OBJECTS_GEOMETRY_EDITED:
      return state.merge({
        geometries: state.geometries.update(
          state.geometries.findIndex(item => item.id === payload.id),
          item => Object.assign({}, item, payload.params)),
      }, { deep: true })

    default:
      return state
  }
}
