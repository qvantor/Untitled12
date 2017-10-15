import * as constants from './editor.constants'

export function selectGeometry (id = null, type = 'geometries') {
  return dispatch => dispatch(
    { type: constants.EDITOR_GEOMETRY_SELECTED, payload: { id, type } })
}

export function setInteract (payload) {
  return dispatch => dispatch({ type: constants.EDITOR_INTERACT_SETTED, payload })
}

export function setTool (payload) {
  return dispatch => dispatch({ type: constants.EDITOR_TOOL_SETTED, payload })
}
