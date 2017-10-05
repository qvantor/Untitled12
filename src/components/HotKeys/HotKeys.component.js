import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { HotKeys } from 'react-hotkeys'

import { removeSelected } from 'store/objects/objects.actions'

@connect(null, { removeSelected })
class Hotkeys extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    removeSelected: PropTypes.func,
  }

  render () {
    const { children, removeSelected } = this.props

    const keyMap = {
      removeSelected: ['del', 'backspace'],
    }
    const handlers = {
      removeSelected,
    }

    return (
      <HotKeys keyMap={keyMap} handlers={handlers} onKeyDown={e => {
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault()
        }
      }}>
        {children}
      </HotKeys>
    )
  }
}
export default Hotkeys
