import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import MouseInput from 'utils/MouseInput'

import ScaleArrow from './ScaleArrow'

const colors = {
  x: new THREE.Color(0xff0000),
  y: new THREE.Color(0x00ff00),
  z: new THREE.Color(0x0000ff),
}
const hoverColor = new THREE.Color(0xffff00)
const dragPlane = new THREE.Plane()
const backVector = new THREE.Vector3(0, 0, -1)

class ScaleHelper extends Component {
  static propTypes = {
    selected: PropTypes.object.isRequired,
    interact: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    camera: PropTypes.instanceOf(THREE.Camera).isRequired,
    mouseInput: PropTypes.instanceOf(MouseInput).isRequired,
    setInteract: PropTypes.func.isRequired,
    editObject: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
  }

  onMouseDown = (event, intersection, name) => {
    const { selected: { position, scale }, camera, setInteract } = this.props
    dragPlane.setFromNormalAndCoplanarPoint(
      backVector
        .clone()
        .applyQuaternion(camera.quaternion),
      intersection.point)

    this.offset = intersection.point.clone().sub(new THREE.Vector3(position[0], position[1], position[2]))
    this.initScale = scale
    this.name = name

    document.addEventListener('mousemove', this.onDocumentMouseMove)
    document.addEventListener('mouseup', this.onDocumentMouseUp)

    setInteract(name)
  }

  onDocumentMouseMove = (event) => {
    event.preventDefault()
    const { mouseInput, selected: { scale, position }, editObject } = this.props
    const ray = mouseInput.getCameraRay(new THREE.Vector2(event.clientX, event.clientY))

    const intersection = dragPlane.intersectLine(new THREE.Line3(
      ray.origin,
      ray.origin.clone().add(ray.direction.clone().multiplyScalar(10000)),
    ))
    if (intersection) {
      editObject(this.props.selected.id, {
        scale: [
          this.name === 'x' ? intersection.sub(this.offset).x / 100 + this.initScale[0] - position[0] : scale[0],
          this.name === 'y' ? intersection.sub(this.offset).y / 100 + this.initScale[1] - position[1] : scale[1],
          this.name === 'z' ? intersection.sub(this.offset).z / 100 + this.initScale[2] - position[2] : scale[2],
        ],
      })
    }
  }

  onDocumentMouseUp = (event) => {
    event.preventDefault()
    document.removeEventListener('mouseup', this.onDocumentMouseUp)
    document.removeEventListener('mousemove', this.onDocumentMouseMove)
    this.props.setInteract(false)
  }

  render () {
    const { interact, size } = this.props
    const origin = new THREE.Vector3(0, 0, 0)

    const arrows = [
      { key: 'x', dir: new THREE.Vector3(1, 0, 0) },
      { key: 'y', dir: new THREE.Vector3(0, 1, 0) },
      { key: 'z', dir: new THREE.Vector3(0, 0, 1) },
    ]

    return (
      <group>
        {arrows.map(item =>
          <ScaleArrow
            key={item.key}
            onMouseDown={(e, i) => this.onMouseDown(e, i, item.key)}
            color={interact === item.key ? hoverColor : colors[item.key]}
            hoverColor={hoverColor}
            length={size}
            origin={origin}
            dir={item.dir}
          />)}
      </group>
    )
  }
}

export default ScaleHelper
