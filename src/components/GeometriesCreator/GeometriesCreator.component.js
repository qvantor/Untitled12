import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'antd'

import * as Geometries from './GeometriesCreator.initial'

import { addGeometry } from 'store/objects/objects.actions'

class GeometriesCreator extends Component {
  static propTypes = {
    addGeometry: PropTypes.func.isRequired,
  }

  render () {
    const { addGeometry } = this.props

    const buttons = [
      { key: 'plane', name: 'Plane' },
      { key: 'box', name: 'Box' },
      { key: 'cylinder', name: 'Cylinder' },
      { key: 'circle', name: 'Circle' },
      { key: 'sphere', name: 'Sphere' },
      { key: 'torus', name: 'Torus' },
    ]

    return (
      <div className='button-panel'>
        <h5>Geometries</h5>
        {buttons.map((item, i) =>
          <Button
            key={i}
            size='small'
            onClick={e => addGeometry(Geometries[item.key])}
            ghost>{item.name}
          </Button>,
        )}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {}
}
export default connect(mapStateToProps, { addGeometry })(GeometriesCreator)
