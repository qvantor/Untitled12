import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'

class PointLight extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    intensity: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired,
    decay: PropTypes.number.isRequired,
    position: PropTypes.instanceOf(THREE.Vector3).isRequired,
  }

  render () {
    const { color, intensity, position, distance, decay } = this.props

    return (
      <group position={position}>
        <mesh>
          <sphereGeometry radius={0.5} widthSegments={4} heightSegments={4} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
        <pointLight color={color} intensity={intensity} distance={distance} decay={decay} />
      </group>
    )
  }
}

export default PointLight
