import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'

class AmbientLight extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    intensity: PropTypes.number.isRequired,
    position: PropTypes.instanceOf(THREE.Vector3).isRequired,
  }

  render () {
    const { color, intensity, position } = this.props

    return (
      <group position={position}>
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
