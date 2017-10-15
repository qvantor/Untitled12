import React, { Component } from 'react'
import { connect } from 'react-redux'
import wrapStore from 'utils/wrapStore'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import AmbientLight from './AmbientLight.component'
import * as LightsTypes from 'utils/objects/Lights.types'
import { selectGeometry } from 'store/editor/editor.actions'

@connect(null, { selectGeometry })
class Light extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    selectGeometry: PropTypes.func,
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.item !== this.props.item
  }

  click = (e, item) => this.props.selectGeometry(this.props.item.id, 'lights')

  render () {
    const objects = { AmbientLight }
    const { item: { id, position, rotation, scale, type, params } } = this.props
    const TagName = objects[type]

    return (
      <group
        name={id}
        onClick={this.click}
        position={new THREE.Vector3(position[0], position[1], position[2])}
        rotation={new THREE.Euler(
          THREE.Math.degToRad(rotation[0]),
          THREE.Math.degToRad(rotation[1]),
          THREE.Math.degToRad(rotation[2]))}
        scale={new THREE.Vector3(scale[0], scale[1], scale[2])}>
        <TagName
          onClick={this.click}
          {...LightsTypes[type]
            .map(item => ({ [item.key]: params[item.pos] }))
            .reduce((acum, item) => Object.assign({}, acum, item), {})} />
      </group>
    )
  }
}

export default wrapStore(Light)
