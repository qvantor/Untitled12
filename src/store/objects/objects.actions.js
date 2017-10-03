import * as constants from './objects.constants'
import IdGenerator from 'utils/IdGenerator'

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
  return (dispatch, getState) => dispatch({
    type: constants.OBJECTS_GEOMETRY_EDITED,
    payload: { id, params },
  })
}
