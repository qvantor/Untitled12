import * as constants from './editor.constants'
import Model from './editor.model'

export default function editor (state = Model, { type, payload }) {
  switch (type) {
    case constants.EDITOR_GEOMETRY_SELECTED:
      return state.merge({ selected: payload })

    case constants.EDITOR_INTERACT_SETTED:
      return state.merge({ interact: payload })

    case constants.EDITOR_TOOL_SETTED:
      return state.merge({ tool: payload })

    default:
      return state
  }
}
