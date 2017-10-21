import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import MouseInput from 'utils/MouseInput'

const dragPlane = new THREE.Plane()
const backVector = new THREE.Vector3(0, 0, -1)

const colors = {
  x: [new THREE.Color(0xff0000), new THREE.Color(0xffff00)],
  y: [new THREE.Color(0x00ff00), new THREE.Color(0xffff00)],
  z: [new THREE.Color(0x0000ff), new THREE.Color(0xffff00)],
}

class PositionHelper extends Component {
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

  componentDidMount () {
    this.setDepthTest()
  }

  setDepthTest () {
    Object.keys(this.refs)
      .forEach(key => this.refs[key].children.forEach(item => {
        item.material.depthTest = false
        item.material.depthWrite = false
      }))
  }

  onMouseDown = (event, intersection, name) => {
    const { selected: { position }, camera, setInteract } = this.props

    dragPlane.setFromNormalAndCoplanarPoint(
      backVector
        .clone()
        .applyQuaternion(camera.quaternion),
      intersection.point)

    this.offset = intersection.point.clone().sub(new THREE.Vector3(position[0], position[1], position[2]))

    document.addEventListener('mouseup', this.onDocumentMouseUp)
    document.addEventListener('mousemove', this.onDocumentMouseMove)
    setInteract(name)
  }

  onDocumentMouseMove = (event) => {
    event.preventDefault()
    const { mouseInput, selected: { position }, editObject, interact } = this.props
    const ray = mouseInput.getCameraRay(new THREE.Vector2(event.clientX, event.clientY))

    const intersection = dragPlane.intersectLine(new THREE.Line3(
      ray.origin,
      ray.origin.clone().add(ray.direction.clone().multiplyScalar(10000)),
    ))
    if (intersection) {
      editObject(this.props.selected.id, {
        position: [
          interact === 'x' ? intersection.sub(this.offset).x : position[0],
          interact === 'y' ? intersection.sub(this.offset).y : position[1],
          interact === 'z' ? intersection.sub(this.offset).z : position[2],
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

    const arrows = [
      { key: 'x', dir: new THREE.Vector3(1, 0, 0), },
      { key: 'y', dir: new THREE.Vector3(0, 1, 0), },
      { key: 'z', dir: new THREE.Vector3(0, 0, 1), },
    ]

    return (
      <group>
        {arrows.map(item =>
          <arrowHelper
            key={item.key}
            headWidth={size * 0.15}
            length={size}
            ref={item.key}
            onMouseDown={(e, i) => this.onMouseDown(e, i, item.key)}
            color={colors[item.key][interact === item.key ? 1 : 0]}
            origin={new THREE.Vector3(0, 0, 0)}
            dir={item.dir} />)}
      </group>
    )
  }
}

export default PositionHelper
