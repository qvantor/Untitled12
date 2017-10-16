import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import wrapStore from 'utils/wrapStore'
import * as THREE from 'three'
import MouseInput from 'utils/MouseInput'

import { setInteract } from 'store/editor/editor.actions'
import { editObject } from 'store/objects/objects.actions'

const dragPlane = new THREE.Plane()
const backVector = new THREE.Vector3(0, 0, -1)

const colors = {
  x: [new THREE.Color(0xff0000), new THREE.Color(0xffff00)],
  y: [new THREE.Color(0x00ff00), new THREE.Color(0xffff00)],
  z: [new THREE.Color(0x0000ff), new THREE.Color(0xffff00)],
}

@connect((store) => ({
  selected: store.objects[store.editor.selected.type].find(item => item.id === store.editor.selected.id),
  interact: store.editor.interact,
  tool: store.editor.tool,
}), { setInteract, editObject })
class PositionHelper extends Component {
  static propTypes = {
    selected: PropTypes.object,
    interact: PropTypes.string,
    tool: PropTypes.string,
    setInteract: PropTypes.func,
    editObject: PropTypes.func,
    camera: PropTypes.instanceOf(THREE.Camera),
    mouseInput: PropTypes.instanceOf(MouseInput),
  }

  componentDidUpdate () {
    Object.keys(this.refs)
      .forEach(key => this.refs[key].children.forEach(item => (item.material.depthTest = false)))
  }

  onMouseDown = (event, intersection, name) => {
    const { selected: { position }, camera, setInteract } = this.props

    dragPlane.setFromNormalAndCoplanarPoint(
      backVector
        .clone()
        .applyQuaternion(camera.quaternion),
      intersection.point)

    this.offset = intersection.point.clone().sub(new THREE.Vector3(position[0], position[1], position[2]))
    this.name = name

    document.addEventListener('mouseup', this.onDocumentMouseUp)
    document.addEventListener('mousemove', this.onDocumentMouseMove)
    setInteract(name)
  }

  onDocumentMouseMove = (event) => {
    event.preventDefault()
    const { mouseInput, selected: { position }, editObject } = this.props
    const ray = mouseInput.getCameraRay(new THREE.Vector2(event.clientX, event.clientY))

    const intersection = dragPlane.intersectLine(new THREE.Line3(
      ray.origin,
      ray.origin.clone().add(ray.direction.clone().multiplyScalar(10000)),
    ))
    if (intersection) {
      editObject(this.props.selected.id, {
        position: [
          this.name === 'x' ? intersection.sub(this.offset).x : position[0],
          this.name === 'y' ? intersection.sub(this.offset).y : position[1],
          this.name === 'z' ? intersection.sub(this.offset).z : position[2],
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
    const { selected, interact, tool } = this.props
    if (!selected || tool !== 'translate') return null
    const { position } = selected

    return (
      <group position={new THREE.Vector3(position[0], position[1], position[2])}>
        <arrowHelper
          headWidth={0.2}
          length={2}
          ref='x'
          onMouseDown={(e, i) => this.onMouseDown(e, i, 'x')}
          color={colors['x'][interact === 'x' ? 1 : 0]}
          origin={new THREE.Vector3(0, 0, 0)}
          dir={new THREE.Vector3(1, 0, 0)} />
        <arrowHelper
          headWidth={0.2}
          length={2}
          ref='y'
          onMouseDown={(e, i) => this.onMouseDown(e, i, 'y')}
          color={colors['y'][interact === 'y' ? 1 : 0]}
          origin={new THREE.Vector3(0, 0, 0)}
          dir={new THREE.Vector3(0, 1, 0)} />
        <arrowHelper
          headWidth={0.2}
          length={2}
          ref='z'
          onMouseDown={(e, i) => this.onMouseDown(e, i, 'z')}
          color={colors['z'][interact === 'z' ? 1 : 0]}
          origin={new THREE.Vector3(0, 0, 0)}
          dir={new THREE.Vector3(0, 0, 1)} />
      </group>
    )
  }
}
export default wrapStore(PositionHelper)
