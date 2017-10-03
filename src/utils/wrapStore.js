import React from 'react'
import { Provider } from 'react-redux'
import { getStore } from 'store/createStore'

const wrapHOC = (WrappedComponent) => (props) => (
  <Provider store={getStore()}>
    <WrappedComponent {...props} />
  </Provider>
)

export default wrapHOC
