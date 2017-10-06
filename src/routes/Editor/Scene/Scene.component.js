import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Stats from 'stats.js'
import React3 from 'react-three-renderer'
import MouseInput from 'utils/MouseInput'

import SceneElements from './Scene.elements'
import Camera from './Scene.camera'
import PositionHelper from '../PositionHelper/PositionHelper.component'
import ScaleHelper from '../ScaleHelper/ScaleHelper.component'

class Scene extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  state = {
    mouseInput: null,
  }
  objects = {}

  _onAnimate = () => {
    this._onAnimateInternal()
  }

  componentDidMount () {
    const { container } = this.refs
    this.stats = new Stats()
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.top = '20px'
    container.appendChild(this.stats.domElement)
  }

  onMounted = (objects, key) => {
    this.objects[key] = objects
    this.restrictIntersections()
  }

  componentDidUpdate () {
    const { mouseInput, } = this.refs
    const { scene, container, } = this.refs

    mouseInput.ready(scene, container, this.camera)
    this.restrictIntersections()
    mouseInput.containerResized()
  }

  _onAnimateInternal () {
    const { mouseInput } = this.refs
    if (mouseInput && this.camera && !mouseInput.isReady()) {
      const { scene, container, } = this.refs

      mouseInput.ready(scene, container, this.camera)
      this.restrictIntersections()
      mouseInput.setActive(false)
    }

    if (this.state.mouseInput !== mouseInput) {
      this.setState({ mouseInput, })
    }

    this.stats.update()
  }

  restrictIntersections () {
    this.objectsArray = Object.keys(this.objects)
      .reduce((accum, key) => [...accum, ...this.objects[key]], [])
    this.refs.mouseInput.restrictIntersections(this.objectsArray)
  }

  render () {
    const { width, height, } = this.props
    return (
      <div ref='container'>
        <React3
          antialias
          pixelRatio={window.devicePixelRatio}
          width={width}
          height={height}
          mainCamera='mainCamera'
          onAnimate={this._onAnimate}
          clearColor={0x95a5a6}>
          <module ref='mouseInput' descriptor={MouseInput} />
          <scene ref='scene'>
            <Camera
              onRef={cam => (this.camera = cam)}
              container={this.refs.container}
              width={width}
              height={height} />
            <PositionHelper
              camera={this.camera}
              mouseInput={this.refs.mouseInput}
              onCreate={o => this.onMounted(o, 'positionHelper')} />
            <ScaleHelper
              camera={this.camera}
              mouseInput={this.refs.mouseInput}
              onCreate={o => this.onMounted(o, 'scaleHelper')} />
            <SceneElements id={1} onCreate={o => this.onMounted(o, 'geom')} />
          </scene>
        </React3>
      </div>)
  }
}

export default Scene
