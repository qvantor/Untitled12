import * as constants from './editor.constants'

export function selectGeometry (id) {
  return dispatch => dispatch(
    { type: constants.EDITOR_GEOMETRY_SELECTED, payload: id })
}

export function setDrag (payload) {
  return dispatch => dispatch({ type: constants.EDITOR_DRAG_SETTED, payload })
}
