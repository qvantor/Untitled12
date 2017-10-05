import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InputNumber from 'components/InputNumber/InputNumber.component'
import { MAX_SAFE_INTEGER } from 'utils/Geometries/Geometries.types'

import { editGeometry } from 'store/objects/objects.actions'

@connect((store) => ({
  selected: store.objects.geometries.find(item => item.id === store.editor.selected.id),
}), { editGeometry })
class RotationEditor extends Component {
  static propTypes = {
    selected: PropTypes.object,
    editGeometry: PropTypes.func,
  }

  change (val, i) {
    const { selected, editGeometry } = this.props
    editGeometry(selected.id, { rotation: selected.rotation.update(i, item => val) })
  }

  render () {
    const { selected } = this.props
    if (!selected) return null
    const { rotation } = selected

    return (
      <div className='panel'>
        <h5>Rotation</h5>
        <div className='row'>
          {rotation.map((pos, i) =>
            <div className='col-md-4' key={i}>
              <InputNumber
                min={-MAX_SAFE_INTEGER}
                max={MAX_SAFE_INTEGER}
                value={pos}
                onChange={val => this.change(val, i)} />
            </div>)}
        </div>
      </div>
    )
  }
}

export default RotationEditor
