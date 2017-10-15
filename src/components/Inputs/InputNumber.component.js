import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'antd'

class InputNumber extends Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    integer: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }
  state = {
    editVal: null,
  }

  setValue = (value) => {
    if (!(/|^\d+(\.)?(\d+)?$/.test(value))) return
    const { min, max, onChange, integer } = this.props

    value = value === '' ? 0 : value
    value = Number(value) < min ? min : value
    value = Number(value) > max ? max : value
    value = isNaN(Number(value)) ? min : value
    value = integer ? Math.round(value) : value

    onChange(Math.round(Number(value) * 100) / 100)
    this.setState({ editVal: null })
  }

  onMouseDown = (e) => {
    this.offset = e.clientX
    this.startVal = this.props.value
    document.addEventListener('mouseup', this.onDocumentMouseUp)
    document.addEventListener('mousemove', this.onDocumentMouseMove)
  }

  onDocumentMouseMove = (e) => {
    e.preventDefault()
    const step = this.props.integer ? 0.3 : this.startVal === 0 ? 0.001 : Math.abs(this.startVal * 0.001)
    this.setValue(this.startVal + ((e.clientX - this.offset) * step))
  }

  onDocumentMouseUp = (e) => {
    e.preventDefault()
    this.drag = false
    document.removeEventListener('mouseup', this.onDocumentMouseUp)
    document.removeEventListener('mousemove', this.onDocumentMouseMove)
  }

  render () {
    const { value } = this.props
    const { editVal } = this.state
    // @todo show only 2 decimal digits
    return (
      <div className='input number'>
        <Icon type='select' onMouseDown={this.onMouseDown} />
        <input
          value={editVal === null ? value : editVal}
          onChange={({ target: { value } }) => this.setState({ editVal: value })}
          onBlur={({ target: { value } }) => this.setValue(value)} />
      </div>
    )
  }
}

export default InputNumber
