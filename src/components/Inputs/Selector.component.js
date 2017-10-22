import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Select } from 'antd'

const { Option } = Select

class Selector extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func,
  }

  render () {
    const { options, onChange, value } = this.props

    return (
      <Select onChange={onChange} value={value}>
        {options.map(item =>
          <Option
            key={item.value}
            value={item.value}>
            {item.name}
          </Option>)}
      </Select>
    )
  }
}

export default Selector
