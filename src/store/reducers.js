import { combineReducers } from 'redux'
import locationReducer from './location'

import scenes from './scenes/scenes.reducer'
import objects from './objects/objects.reducer'
import editor from './editor/editor.reducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    scenes,
    objects,
    editor,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
