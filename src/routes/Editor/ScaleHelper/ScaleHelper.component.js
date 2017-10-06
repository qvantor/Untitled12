import React, { Component } from 'react'
import { connect } from 'react-redux'
import wrapStore from 'utils/wrapStore'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import MouseInput from 'utils/MouseInput'

import { editGeometry } from 'store/objects/objects.actions'
import { setInteract } from 'store/editor/editor.actions'

import ScaleArrow from './ScaleArrow'

const colors = {
  x: new THREE.Color(0xff0000),
  y: new THREE.Color(0x00ff00),
  z: new THREE.Color(0x0000ff),
}
const hoverColor = new THREE.Color(0xffff00)
const dragPlane = new THREE.Plane()
const backVector = new THREE.Vector3(0, 0, -1)

@connect((store) => ({
  selected: store.objects.geometries.find(item => item.id === store.editor.selected.id),
  interact: store.editor.interact,
  tool: store.editor.tool,
}), { setInteract, editGeometry })
class ScaleHelper extends Component {
  static propTypes = {
    selected: PropTypes.object,
    interact: PropTypes.string,
    tool: PropTypes.string,
    onCreate: PropTypes.func.isRequired,
    setInteract: PropTypes.func,
    editGeometry: PropTypes.func,
    camera: PropTypes.instanceOf(THREE.Camera),
    mouseInput: PropTypes.instanceOf(MouseInput),
  }
  elements = {}

  componentDidUpdate () {
    this.props.onCreate(this.elements)
  }

  onCreate (el) {
    if (!el) return
    this.elements = [...this.elements, el]
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
    const { mouseInput, selected: { scale, position }, editGeometry } = this.props
    const ray = mouseInput.getCameraRay(new THREE.Vector2(event.clientX, event.clientY))

    const intersection = dragPlane.intersectLine(new THREE.Line3(
      ray.origin,
      ray.origin.clone().add(ray.direction.clone().multiplyScalar(10000)),
    ))
    if (intersection) {
      editGeometry(this.props.selected.id, {
        scale: [
          this.name === 'x' ? intersection.sub(this.offset).x + this.initScale[0] - position[0] : scale[0],
          this.name === 'y' ? intersection.sub(this.offset).y + this.initScale[1] - position[1] : scale[1],
          this.name === 'z' ? intersection.sub(this.offset).z + this.initScale[2] - position[2] : scale[2],
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
    const { selected, tool, interact } = this.props
    this.elements = []

    if (!selected || tool !== 'scale') return null
    const { position } = selected
    const origin = new THREE.Vector3(0, 0, 0)
    const length = 2

    const arrows = [
      { key: 'x', dir: new THREE.Vector3(1, 0, 0) },
      { key: 'y', dir: new THREE.Vector3(0, 1, 0) },
      { key: 'z', dir: new THREE.Vector3(0, 0, 1) },
    ]

    return (
      <group position={new THREE.Vector3(position[0], position[1], position[2])}>
        {arrows.map(item =>
          <ScaleArrow
            key={item.key}
            onCreate={el => this.onCreate(el, item.key)}
            onMouseDown={(e, i) => this.onMouseDown(e, i, item.key)}
            color={interact === item.key ? hoverColor : colors[item.key]}
            hoverColor={hoverColor}
            length={length}
            origin={origin}
            dir={item.dir}
          />)}
      </group>
    )
  }
}

export default wrapStore(ScaleHelper)
