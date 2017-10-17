import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import MouseInput from 'utils/MouseInput'
import { connect } from 'react-redux'
import wrapStore from 'utils/wrapStore'
import { initialSize } from 'utils/objects/Params.types'

import { setInteract } from 'store/editor/editor.actions'
import { editObject } from 'store/objects/objects.actions'

import Translate from './Translate/Translate.component'
import Rotation from './Rotation/Rotation.component'
import Scale from './Scale/Scale.component'

@connect((store) => ({
  selected: store.objects[store.editor.selected.type].find(item => item.id === store.editor.selected.id),
  interact: store.editor.interact,
  tool: store.editor.tool,
}), { setInteract, editObject })
class Tools extends Component {
  static propTypes = {
    camera: PropTypes.instanceOf(THREE.Camera),
    mouseInput: PropTypes.instanceOf(MouseInput),
    tool: PropTypes.string,
    selected: PropTypes.object,
    interact: PropTypes.string,
    setInteract: PropTypes.func,
    editObject: PropTypes.func,
  }
  // @todo calculate size from selected object size
  render () {
    const { camera, mouseInput, tool, selected, interact, setInteract, editObject } = this.props
    if (!selected) return null
    const { position } = selected
    const size = initialSize * 1.5
    const props = { camera, mouseInput, tool, selected, interact, setInteract, editObject, size }

    return (
      <group position={new THREE.Vector3(position[0], position[1], position[2])}>
        {tool === 'translate' && <Translate {...props} />}
        {tool === 'rotation' && <Rotation {...props} />}
        {tool === 'scale' && <Scale {...props} />}
      </group>
    )
  }
}

export default wrapStore(Tools)
