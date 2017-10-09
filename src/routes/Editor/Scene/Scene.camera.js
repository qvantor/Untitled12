import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import wrapStore from 'utils/wrapStore'

import * as THREE from 'three'

import OB from 'three-orbit-controls'
const OrbitControls = OB(THREE)

@connect((store) => ({
  interact: store.editor.interact,
}))
class Camera extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onRef: PropTypes.func.isRequired,
    interact: PropTypes.string,
    container: PropTypes.instanceOf(Element),
  }

  state = {
    cameraPosition: new THREE.Vector3(0, 0, 20),
    cameraRotation: new THREE.Euler(),
  }

  componentDidMount () {
    this.props.onRef(this.refs.camera)
  }

  componentWillUnmount () {
    this.props.onRef(undefined)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.container !== this.props.container) {
      this.controls = new OrbitControls(this.refs.camera, this.props.container)
      // this.controls.addEventListener('change', e => console.log(this.refs.camera.position))
    }
    this.controls.enabled = !this.props.interact
  }

  setPosition (position) {
    this.controls.target = new THREE.Vector3(position[0], position[1], position[2])
    this.controls.update()
  }

  render () {
    const { width, height } = this.props
    const { cameraPosition, cameraRotation } = this.state

    return (
      <perspectiveCamera
        ref='camera'
        name='mainCamera'
        fov={75}
        aspect={width / height}
        near={0.3}
        far={1000}
        position={cameraPosition}
        rotation={cameraRotation} />
    )
  }
}
export default wrapStore(Camera)
