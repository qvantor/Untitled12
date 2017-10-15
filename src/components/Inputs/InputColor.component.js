import React, { Component } from 'react'
import PropTypes from 'prop-types'

class InputColor extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }

  render () {
    const { onChange, value } = this.props

    return (
      <input type='color' value={value} onChange={({ target: { value } }) => onChange(value)} />
    )
  }
}

export default InputColor
