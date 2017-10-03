import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as GeometryTypes from 'utils/Geometries/Geometries.types'

import { editGeometry } from 'store/objects/objects.actions'
import InputNumber from 'components/InputNumber/InputNumber.component'

@connect((store) => ({ selected: store.objects.geometries.find(item => item.id === store.editor.selected), }),
  { editGeometry })
class GeometriesEditor extends Component {
  static propTypes = {
    selected: PropTypes.object,
    editGeometry: PropTypes.func,
  }

  editGeometry (val, pos) {
    const { editGeometry, selected: { geometry, id } } = this.props
    editGeometry(id, { geometry: geometry.update(pos, item => val) })
  }

  render () {
    const { selected } = this.props
    if (!selected) return null
    const { geometry, type } = selected

    return (
      <div>
        <h5>Geometry</h5>
        {GeometryTypes[type]
          .filter(item => item.type.name === 'number')
          .map((item, i) =>
            <div key={i} className='row'>
              <div className='col-md-7'>
                {item.name}
              </div>
              <div className='col-md-5'>
                <InputNumber
                  integer={item.type.integer}
                  onChange={val => this.editGeometry(val, item.pos)}
                  value={geometry[item.pos]}
                  min={item.type.min}
                  max={item.type.max} />
              </div>
            </div>,
          )}
      </div>
    )
  }
}

export default GeometriesEditor
