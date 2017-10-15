import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InputNumber from 'components/InputNumber/InputNumber.component'
import { MAX_SAFE_INTEGER } from 'utils/objects/Params.types'

import { editObject } from 'store/objects/objects.actions'

@connect((store) => ({
  selected: store.objects.geometries.find(item => item.id === store.editor.selected.id),
}), { editObject })
class ScaleEditor extends Component {
  static propTypes = {
    selected: PropTypes.object,
    editObject: PropTypes.func,
  }

  change (val, i) {
    const { selected, editObject } = this.props
    editObject(selected.id, { scale: selected.scale.update(i, item => val) })
  }

  render () {
    const { selected } = this.props
    if (!selected) return null
    const { scale } = selected

    return (
      <div className='panel'>
        <h5>Scale</h5>
        <div className='row'>
          {scale.map((pos, i) =>
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

export default ScaleEditor
