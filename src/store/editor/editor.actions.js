import * as constants from './editor.constants'

export function selectGeometry (id = null, type = null) {
  return dispatch => dispatch(
    { type: constants.EDITOR_GEOMETRY_SELECTED, payload: { id, type } })
}

export function setDrag (payload) {
  return dispatch => dispatch({ type: constants.EDITOR_DRAG_SETTED, payload })
}
