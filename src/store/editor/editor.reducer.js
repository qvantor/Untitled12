import * as constants from './editor.constants'
import Model from './editor.model'

export default function editor (state = Model, { type, payload }) {
  switch (type) {
    case constants.EDITOR_GEOMETRY_SELECTED:
      return state.merge({ selected: payload })

    case constants.EDITOR_DRAG_SETTED:
      return state.merge({ drag: payload })

    default:
      return state
  }
}
