import React, { Component } from 'react'
import PropTypes from 'prop-types'
import wrapStore from 'utils/wrapStore'
import { connect } from 'react-redux'
import * as GeometryTypes from 'utils/objects/Geometries.types'

import { selectGeometry } from 'store/editor/editor.actions'

import * as THREE from 'three'

@connect(null, { selectGeometry })
class BoxGeometry extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    selectGeometry: PropTypes.func,
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.item !== this.props.item
  }

  click = (e, { object }) => this.props.selectGeometry(object.name, 'geometries')

  render () {
    const { item: { id, position, rotation, scale, params, type } } = this.props
    const TagName = type
    return (
      <mesh
        name={id}
        onClick={this.click}
        position={new THREE.Vector3(position[0], position[1], position[2])}
        rotation={new THREE.Euler(
          THREE.Math.degToRad(rotation[0]),
          THREE.Math.degToRad(rotation[1]),
          THREE.Math.degToRad(rotation[2]))}
        scale={new THREE.Vector3(scale[0], scale[1], scale[2])}>
        <TagName
          {...GeometryTypes[type]
            .map(item => ({ [item.key]: params[item.pos] }))
            .reduce((acum, item) => Object.assign({}, acum, item), {})} />
        <meshStandardMaterial color={0x34495e} />
      </mesh>
    )
  }
}

export default wrapStore(BoxGeometry)
