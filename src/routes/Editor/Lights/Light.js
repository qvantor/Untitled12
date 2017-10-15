import React, { Component } from 'react'
import { connect } from 'react-redux'
import wrapStore from 'utils/wrapStore'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import AmbientLight from './AmbientLight.component'
import DirectionalLight from './DirectionalLight.component'
import PointLight from './PointLight.component'
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
    const lights = { AmbientLight, DirectionalLight, PointLight }
    const { item: { id, position, type, params } } = this.props
    const TagName = lights[type]

    return (
      <group
        name={id}
        onClick={this.click}>
        <TagName
          position={new THREE.Vector3(position[0], position[1], position[2])}
          {...LightsTypes[type]
            .map(item => ({ [item.key]: params[item.pos] }))
            .reduce((acum, item) => Object.assign({}, acum, item), {})} />
      </group>
    )
  }
}

export default wrapStore(Light)
