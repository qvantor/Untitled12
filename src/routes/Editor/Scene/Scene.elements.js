import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import wrapStore from 'utils/wrapStore'

import Geometry from '../Geometry/Geometry'

@connect((store) => ({ geometries: store.objects.geometries }))
class SceneElements extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    geometries: PropTypes.object,
  }

  render () {
    const { id, geometries } = this.props

    const geometryList = geometries.filter(item => item.scene === id)
    return (
      <group>
        {geometryList.map((item, index) => <Geometry item={item} key={item.id} />)}
      </group>
    )
  }
}

export default wrapStore(SceneElements)
