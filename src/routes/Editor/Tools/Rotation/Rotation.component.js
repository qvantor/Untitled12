import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import MouseInput from 'utils/MouseInput'

import Circle from './RotationCircle'

const dragPlane = new THREE.Plane()
const backVector = new THREE.Vector3(0, 0, -1)

class RotationHelper extends Component {
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
    const { selected: { position, rotation }, camera, setInteract } = this.props
    dragPlane.setFromNormalAndCoplanarPoint(
      backVector
        .clone()
        .applyQuaternion(camera.quaternion),
      intersection.point)

    this.offset = intersection.point.clone().sub(new THREE.Vector3(position[0], position[1], position[2]))
    this.initRotation = rotation

    document.addEventListener('mousemove', this.onDocumentMouseMove)
    document.addEventListener('mouseup', this.onDocumentMouseUp)

    setInteract(name)
  }

  onDocumentMouseMove = (event) => {
    event.preventDefault()
    const { mouseInput, selected: { rotation, position }, editObject, interact } = this.props
    const ray = mouseInput.getCameraRay(new THREE.Vector2(event.clientX, event.clientY))

    const intersection = dragPlane.intersectLine(new THREE.Line3(
      ray.origin,
      ray.origin.clone().add(ray.direction.clone().multiplyScalar(10000)),
    ))
    if (intersection) {
      editObject(this.props.selected.id, {
        rotation: [
          interact === 'x' ? intersection.sub(this.offset).x + this.initRotation[0] - position[0] : rotation[0],
          interact === 'y' ? intersection.sub(this.offset).y + this.initRotation[1] - position[1] : rotation[1],
          interact === 'z' ? intersection.sub(this.offset).z + this.initRotation[2] - position[2] : rotation[2],
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
    const circles = [
      { key: 'x', color: '#ff0000' },
      { key: 'y', color: '#00ff00' },
      { key: 'z', color: '#0000ff' },
    ]
    const hoverColor = '#ffff00'

    return (
      <group>
        {circles.map(item =>
          <Circle
            key={item.key}
            axis={item.key}
            color={interact === item.key ? hoverColor : item.color}
            hoverColor={hoverColor}
            onMouseDown={(e, i) => this.onMouseDown(e, i, item.key)}
            radius={size}
          />,
        )}
      </group>
    )
  }
}

export default RotationHelper
