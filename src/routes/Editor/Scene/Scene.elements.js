import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import wrapStore from 'utils/wrapStore'

import Geometry from '../Geometry/Geometry'

let elements = {
  geometry: [],
}

@connect((store) => ({ list: store.objects }))
class SceneElements extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    list: PropTypes.object,
    onCreate: PropTypes.func.isRequired,
  }

  updateElements () {
    const el = Object.keys(elements).reduce((accum, key) => [...accum, ...elements[key]], [])
    this.props.onCreate(el)
  }

  elementCreated ({ element, type, index }) {
    if (element === null) return
    elements[type][index] = element
    this.updateElements()
  }

  render () {
    const { id, list } = this.props

    const geometryList = list.geometries.filter(item => item.scene === id)
    return (
      <group>
        {geometryList.map((item, index) =>
          <Geometry
            onCreate={element => this.elementCreated({ element, index, type: 'geometry' })}
            item={item}
            key={item.id} />)}
      </group>
    )
  }
}

export default wrapStore(SceneElements)
