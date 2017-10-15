import * as constants from './objects.constants'
import Model from './objects.model'

export default function objects (state = Model, { type, payload }) {
  switch (type) {
    case constants.OBJECTS_ADDED:
      return state.merge({ [payload.type]: [...state[payload.type], ...[payload.object]] })

    case constants.OBJECTS_EDITED:
      return state.merge({
        [payload.type]: state[payload.type].update(
          state[payload.type].findIndex(item => item.id === payload.id),
          item => Object.assign({}, item, payload.params)),
      }, { deep: true })

    case constants.OBJECT_SELECTED_REMOVED:
      return state.merge({
        [payload.type]: state[payload.type].filter(item => item.id !== payload.id),
      }, { deep: true })

    default:
      return state
  }
}
