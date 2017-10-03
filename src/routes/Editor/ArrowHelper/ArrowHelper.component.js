import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import wrapStore from 'utils/wrapStore'
import * as THREE from 'three'
import MouseInput from 'utils/MouseInput'

import { setDrag } from 'store/editor/editor.actions'
import { editGeometry } from 'store/objects/objects.actions'

const dragPlane = new THREE.Plane()
const backVector = new THREE.Vector3(0, 0, -1)

const colors = {
  x: [new THREE.Color(0xff0000), new THREE.Color(0xffff00)],
  y: [new THREE.Color(0x00ff00), new THREE.Color(0xffff00)],
  z: [new THREE.Color(0x0000ff), new THREE.Color(0xffff00)],
}

@connect((store) => ({
  selected: store.objects.geometries.find(item => item.id === store.editor.selected),
  drag: store.editor.drag,
}), { setDrag, editGeometry })
class ArrowHelper extends Component {
  static propTypes = {
    selected: PropTypes.object,
    drag: PropTypes.string,
    setDrag: PropTypes.func,
    editGeometry: PropTypes.func,
    onCreate: PropTypes.func.isRequired,
    camera: PropTypes.instanceOf(THREE.Camera),
    mouseInput: PropTypes.instanceOf(MouseInput),
  }

  componentDidUpdate () {
    this.props.onCreate(
      Object.keys(this.refs)
        .map(key => this.refs[key].children)
        .reduce((sum, item) => [...sum, ...item], [])
        .map(item => {
          item.material.depthTest = false
          return item
        })
        .filter(item => item.type === 'Mesh'),
    )
  }

  onMouseDown = (event, intersection, name) => {
    const { selected: { position } } = this.props

    dragPlane.setFromNormalAndCoplanarPoint(
      backVector
        .clone()
        .applyQuaternion(this.props.camera.quaternion),
      intersection.point)

    this._offset = intersection.point.clone().sub(new THREE.Vector3(position[0], position[1], position[2]))
    this.name = name

    document.addEventListener('mouseup', this.onDocumentMouseUp)
    document.addEventListener('mousemove', this.onDocumentMouseMove)
    this.props.setDrag(name)
  }

  onDocumentMouseMove = (event) => {
    event.preventDefault()
    const { mouseInput, selected: { position }, editGeometry } = this.props
    const ray = mouseInput.getCameraRay(new THREE.Vector2(event.clientX, event.clientY))

    const intersection = dragPlane.intersectLine(new THREE.Line3(
      ray.origin,
      ray.origin.clone().add(ray.direction.clone().multiplyScalar(10000)),
    ))
    if (intersection) {
      editGeometry(this.props.selected.id, {
        position: [
          this.name === 'x' ? intersection.sub(this._offset).x : position[0],
          this.name === 'y' ? intersection.sub(this._offset).y : position[1],
          this.name === 'z' ? intersection.sub(this._offset).z : position[2],
        ],
      })
    }
  }

  onDocumentMouseUp = (event) => {
    event.preventDefault()
    document.removeEventListener('mouseup', this.onDocumentMouseUp)
    document.removeEventListener('mousemove', this.onDocumentMouseMove)
    this.props.setDrag(false)
  }

  render () {
    const { selected, drag } = this.props
    if (!selected) return null
    const { position } = selected

    return (
      <group position={new THREE.Vector3(position[0], position[1], position[2])}>
        <arrowHelper
          headWidth={0.2}
          length={2}
          ref='x'
          onMouseDown={(e, i) => this.onMouseDown(e, i, 'x')}
          color={colors['x'][drag === 'x' ? 1 : 0]}
          origin={new THREE.Vector3(0, 0, 0)}
          dir={new THREE.Vector3(2, 0, 0)} />
        <arrowHelper
          headWidth={0.2}
          length={2}
          ref='y'
          onMouseDown={(e, i) => this.onMouseDown(e, i, 'y')}
          color={colors['y'][drag === 'y' ? 1 : 0]}
          origin={new THREE.Vector3(0, 0, 0)}
          dir={new THREE.Vector3(0, 2, 0)} />
        <arrowHelper
          headWidth={0.2}
          length={2}
          ref='z'
          onMouseDown={(e, i) => this.onMouseDown(e, i, 'z')}
          color={colors['z'][drag === 'z' ? 1 : 0]}
          origin={new THREE.Vector3(0, 0, 0)}
          dir={new THREE.Vector3(0, 0, 2)} />
      </group>
    )
  }
}
export default wrapStore(ArrowHelper)
