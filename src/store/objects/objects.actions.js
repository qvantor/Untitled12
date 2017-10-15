import * as constants from './objects.constants'
import IdGenerator from 'utils/IdGenerator'

import { selectGeometry }  from '../editor/editor.actions'

export function addObject (object, type) {
  return (dispatch, getState) => {
    const { scenes } = getState()
    const id = IdGenerator()
    dispatch({
      type: constants.OBJECTS_ADDED,
      payload: { object: Object.assign(object, { id, scene: scenes.active }), type },
    })
  }
}

export function editGeometry (id, params) {
  return (dispatch, getState) => {
    const type = getState().editor.selected.type
    dispatch({
      type: constants.OBJECTS_EDITED,
      payload: { id, type, params },
    })
  }
}

export function removeSelected () {
  return (dispatch, getState) => {
    const { editor: { selected } } = getState()
    if (!selected.id) return
    dispatch({ type: constants.OBJECT_SELECTED_REMOVED, payload: selected })
    dispatch(selectGeometry())
  }
}
