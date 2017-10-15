import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as GeometryTypes from 'utils/objects/Geometries.types'
import * as LightsTypes from 'utils/objects/Lights.types'
import { editObject } from 'store/objects/objects.actions'

import InputNumber from 'components/InputNumber/InputNumber.component'
import PositionForm from 'components/PositionEditor/Position.form'

@connect((store) => ({
  selected: store.objects[store.editor.selected.type].find(item => item.id === store.editor.selected.id),
}), { editObject })
class GeometriesEditor extends Component {
  static propTypes = {
    selected: PropTypes.object,
    editObject: PropTypes.func,
  }

  editObject (val, pos) {
    const { editObject, selected: { params, id } } = this.props
    editObject(id, { params: params.update(pos, item => val) })
  }

  render () {
    const { selected } = this.props
    if (!selected) return null
    const { params, type } = selected
    const objectTypes = Object.assign({}, LightsTypes, GeometryTypes)

    return (
      <div className='panel'>
        <h5>Params</h5>
        {objectTypes[type]
          .map((item, i) =>
            <div key={i} className='row'>
              <div className='col-md-6'>
                {item.name}
              </div>
              <div className='col-md-6'>
                {item.type.name === 'number' &&
                <InputNumber
                  integer={item.type.integer}
                  onChange={val => this.editObject(val, item.pos)}
                  value={params[item.pos]}
                  min={item.type.min}
                  max={item.type.max} />}
              </div>
            </div>,
          )}
      </div>
    )
  }
}

export default GeometriesEditor
