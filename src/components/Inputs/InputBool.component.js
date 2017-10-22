import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Checkbox } from 'antd'

class InputBool extends Component {
  static propTypes = {
    value: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
  }

  render () {
    const { onChange, value, name } = this.props

    return (
      <Checkbox onChange={({ target }) => onChange(target.checked)} checked={value}>{name}</Checkbox>
    )
  }
}

export default InputBool
