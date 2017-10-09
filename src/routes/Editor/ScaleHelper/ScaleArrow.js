import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as THREE from 'three'

class ScaleArrow extends Component {
  static propTypes = {
    color: PropTypes.instanceOf(THREE.Color).isRequired,
    hoverColor: PropTypes.instanceOf(THREE.Color).isRequired,
    origin: PropTypes.instanceOf(THREE.Vector3).isRequired,
    dir: PropTypes.instanceOf(THREE.Vector3).isRequired,
    length: PropTypes.number.isRequired,
    onMouseDown: PropTypes.func,
  }

  calcQuaternion (dir) {
    const quaternion = new THREE.Quaternion()

    if (dir.y > 0.99999) {
      quaternion.set(0, 0, 0, 1)
    } else if (dir.y < -0.99999) {
      quaternion.set(1, 0, 0, 0)
    } else {
      const axis = new THREE.Vector3()
      const radians = Math.acos(dir.y)

      axis.set(dir.z, 0, -dir.x).normalize()
      quaternion.setFromAxisAngle(axis, radians)
    }
    return quaternion
  }

  onMouseLeave = () => this.setColor(this.props.color)

  onMouseEnter = () => this.setColor(this.props.hoverColor)

  setColor (color) {
    this.refs.el.children.forEach(item => (item.material.color = color.clone()))
  }

  render () {
    const { color, length, origin, dir, onMouseDown } = this.props
    const cubeSize = length * 0.1

    return (
      <group
        ref='el'
        name='ScaleArrow'
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={onMouseDown}
        position={origin}
        quaternion={this.calcQuaternion(dir)}>
        <line scale={new THREE.Vector3(1, Math.max(0, length - cubeSize), 1)}>
          <geometry vertices={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0)]} />
          <lineBasicMaterial color={color} depthTest={false} />
        </line>
        <mesh
          position={new THREE.Vector3(0, length - cubeSize, 0)}
          scale={new THREE.Vector3(cubeSize, cubeSize, cubeSize)}>
          <boxGeometry width={1} height={1} depth={1} />
          <meshBasicMaterial color={color} depthTest={false} />
        </mesh>
      </group>
    )
  }
}

export default ScaleArrow
