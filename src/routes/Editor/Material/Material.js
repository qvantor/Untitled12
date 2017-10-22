import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as MaterialsTypes from 'utils/objects/Materials.types'

class Material extends Component {
  static propTypes = {
    material: PropTypes.object.isRequired,
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.material !== this.props.material
  }

  render () {
    const { material: { type, params } } = this.props
    const TagName = type
    console.log(MaterialsTypes[type].params
      .map(item => ({ [item.key]: params[item.pos] }))
      .reduce((acum, item) => Object.assign({}, acum, item), {}))
    return (
      <TagName {...MaterialsTypes[type].params
        .map(item => ({ [item.key]: params[item.pos] }))
        .reduce((acum, item) => Object.assign({}, acum, item), {})} />
    )
  }
}

export default Material
