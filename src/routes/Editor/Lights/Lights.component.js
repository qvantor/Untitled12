import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import wrapStore from 'utils/wrapStore'

import Light from './Light'

@connect((store) => ({ lights: store.objects.lights }))
class Lights extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    lights: PropTypes.array,
  }

  render () {
    const { lights, id } = this.props
    const lightsList = lights.filter(item => item.scene === id)
    return (
      <group>
        {lightsList.map((item, index) => <Light item={item} key={item.id} />)}
      </group>
    )
  }
}
export default wrapStore(Lights)
