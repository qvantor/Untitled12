import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'

class DirectionalLight extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    intensity: PropTypes.number.isRequired,
    position: PropTypes.instanceOf(THREE.Vector3).isRequired,
  }

  render () {
    const { color, intensity, position } = this.props
    const lookAtVector = new THREE.Vector3(0, 0, 0)
    let v1, v2, v3
    if (this.refs.light) {
      v1 = new THREE.Vector3().setFromMatrixPosition(this.refs.light.matrixWorld)
      v2 = new THREE.Vector3().setFromMatrixPosition(this.refs.light.target.matrixWorld)
      v3 = new THREE.Vector3().subVectors(v2, v1)
    }
    // @todo draw a sprite circle instead sphereGeometry
    return (
      <group>
        <mesh position={lookAtVector}>
          <sphereGeometry radius={0.2} widthSegments={4} heightSegments={4} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
        <line>
          <geometry vertices={[position, lookAtVector]} />
          <lineBasicMaterial color={color} />
        </line>
        <group>
          <mesh lookAt={v3 || null} position={position}>
            <planeGeometry width={1} height={1} />
            <meshBasicMaterial side={THREE.DoubleSide} color={color} wireframe />
          </mesh>
          <directionalLight
            position={position}
            lookAt={lookAtVector}
            ref='light'
            color={color}
            intensity={intensity} />
        </group>
      </group>
    )
  }
}

export default DirectionalLight
