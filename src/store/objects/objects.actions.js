import * as constants from './objects.constants'
import IdGenerator from 'utils/IdGenerator'

import { selectGeometry }  from '../editor/editor.actions'

export function addGeometry (box) {
  return (dispatch, getState) => {
    const { scenes } = getState()
    const id = IdGenerator()
    dispatch({
      type: constants.OBJECTS_GEOMETRY_ADDED,
      payload: Object.assign(box, { id, scene: scenes.active }),
    })
  }
}

export function editGeometry (id, params) {
  return dispatch => dispatch({
    type: constants.OBJECTS_GEOMETRY_EDITED,
    payload: { id, params },
  })
}

export function removeSelected () {
  return (dispatch, getState) => {
    console.log('removeSelected')
    const { editor: { selected } } = getState()
    if (!selected.id) return
    dispatch({ type: constants.OBJECT_SELECTED_REMOVED, payload: selected })
    dispatch(selectGeometry())
  }
}
