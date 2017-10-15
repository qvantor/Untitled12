import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button } from 'antd'

import * as Lights from './LightsCreator.initial'

import { addObject } from 'store/objects/objects.actions'

class LightsCreator extends Component {
  static propTypes = {
    addObject: PropTypes.func.isRequired,
  }

  render () {
    const { addObject } = this.props
    const buttons = [{ key: 'AmbientLight', name: 'Ambient Light' }]

    return (
      <div>
        <h5>Lights</h5>
        {buttons.map((item, i) =>
          <Button
            key={i}
            size='small'
            onClick={e => addObject(Lights[item.key], 'lights')}
            ghost>{item.name}
          </Button>)}
      </div>
    )
  }
}
export default connect(null, { addObject })(LightsCreator)
