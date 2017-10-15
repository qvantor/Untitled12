import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'

class AmbientLight extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    intensity: PropTypes.number.isRequired,
  }

  render () {
    const { color, intensity } = this.props

    return (
      <group>
        <mesh>
          <sphereGeometry radius={0.5} />
          <meshBasicMaterial side={THREE.DoubleSide} />
        </mesh>
        <ambientLight color={color} intensity={intensity} />
      </group>
    )
  }
}

export default AmbientLight
