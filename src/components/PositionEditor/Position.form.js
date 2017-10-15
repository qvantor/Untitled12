import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MAX_SAFE_INTEGER } from 'utils/objects/Params.types'
import InputNumber from 'components/Inputs/InputNumber.component'

class PositionForm extends Component {
  static propTypes = {
    position: PropTypes.array.isRequired,
    change: PropTypes.func.isRequired,
  }

  changes (val, i) {
    const { position, change } = this.props
    change(position.update(i, item => val))
  }

  render () {
    const { position } = this.props

    return (
      <div className='row'>
        {position.map((pos, i) =>
          <div className='col-md-4' key={i}>
            <InputNumber
              min={-MAX_SAFE_INTEGER}
              max={MAX_SAFE_INTEGER}
              value={pos}
              onChange={val => this.changes(val, i)} />
          </div>)}
      </div>
    )
  }
}

export default PositionForm
