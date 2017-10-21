import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { editObject } from 'store/objects/objects.actions'

import PositionForm from './Position.form'

@connect((store) => ({
  selected: store.objects[store.editor.selected.type].find(item => item.id === store.editor.selected.id),
}), { editObject })
class PositionEditor extends Component {
  static propTypes = {
    selected: PropTypes.object,
    editObject: PropTypes.func,
  }

  change = (newPos) => {
    const { selected, editObject } = this.props
    editObject(selected.id, { position: newPos })
  }

  render () {
    const { selected } = this.props
    if (!selected) return null
    const { position } = selected

    return (
      <div>
        <h5>Position</h5>
        <PositionForm position={position} change={this.change} />
      </div>
    )
  }
}
export default PositionEditor
