import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'

class RotationCircle extends Component {
  static propTypes = {
    axis: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    hoverColor: PropTypes.string.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    radius: PropTypes.number.isRequired,
  }

  circleGeometry (radius, facing) {
    let vertices = []
    const steps = 32
    for (let i = 0; i <= steps * 2; ++i) {
      if (facing === 'x') {
        vertices = [
          ...vertices,
          new THREE.Vector3(0, Math.cos(i / steps * Math.PI) * radius, Math.sin(i / steps * Math.PI) * radius)]
      }
      if (facing === 'y') {
        vertices = [
          ...vertices,
          new THREE.Vector3(Math.cos(i / steps * Math.PI) * radius, 0, Math.sin(i / steps * Math.PI) * radius)]
      }
      if (facing === 'z') {
        vertices = [
          ...vertices,
          new THREE.Vector3(Math.sin(i / steps * Math.PI) * radius, Math.cos(i / steps * Math.PI) * radius, 0)]
      }
    }
    return vertices
  }

  onMouseLeave = () => this.setColor(this.props.color)

  onMouseEnter = () => this.setColor(this.props.hoverColor)

  setColor (color) {
    this.refs.el.material.color = new THREE.Color(color)
  }

  render () {
    const { axis, radius, color, onMouseDown } = this.props

    return (
      <line
        ref='el'
        onMouseLeave={this.onMouseLeave}
        onMouseEnter={this.onMouseEnter}
        onMouseDown={onMouseDown}>
        <geometry vertices={this.circleGeometry(radius, axis)} />
        <lineBasicMaterial color={color} />
      </line>
    )
  }
}

export default RotationCircle
