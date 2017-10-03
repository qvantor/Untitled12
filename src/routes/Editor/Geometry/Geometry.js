import React, { Component } from 'react'
import PropTypes from 'prop-types'
import wrapStore from 'utils/wrapStore'
import { connect } from 'react-redux'
import * as GeometryTypes from 'utils/Geometries/Geometries.types'

import { selectGeometry } from 'store/editor/editor.actions'

import * as THREE from 'three'

@connect(null, { selectGeometry })
class BoxGeometry extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onCreate: PropTypes.func.isRequired,
    selectGeometry: PropTypes.func,
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.item !== this.props.item
  }

  click = (e, { object }) => {
    this.props.selectGeometry(object.name)
  }

  render () {
    const { item: { id, position, geometry, type }, onCreate } = this.props
    const TagName = type
    return (
      <mesh
        name={id}
        onClick={this.click}
        ref={mesh => onCreate(mesh)}
        position={new THREE.Vector3(position[0], position[1], position[2])}>
        <TagName
          {...GeometryTypes[type]
            .map(item => ({ [item.key]: geometry[item.pos] }))
            .reduce((acum, item) => Object.assign({}, acum, item), {})}
        />
        <meshBasicMaterial color={0x34495e} side={THREE.DoubleSide} wireframe />
      </mesh>
    )
  }
}

export default wrapStore(BoxGeometry)
