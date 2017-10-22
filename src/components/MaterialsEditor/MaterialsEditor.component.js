import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Selector from '../Inputs/Selector.component'
import InputColor from '../Inputs/InputColor.component'
import InputNumber from '../Inputs/InputNumber.component'
import InputBool from '../Inputs/InputBool.component'

import * as materialsObjects from 'utils/objects/Materials.types'

import { editObject } from 'store/objects/objects.actions'

@connect((store) => ({
  material: store.objects[store.editor.selected.type].find(item => item.id === store.editor.selected.id).material,
  selectedId: store.editor.selected.id,
}), { editObject })
class MaterialsEditor extends Component {
  static propTypes = {
    material: PropTypes.object,
    selectedId: PropTypes.string,
    editObject: PropTypes.func,
  }

  editObject (val, pos) {
    const { material: { params, type }, editObject, selectedId } = this.props
    editObject(selectedId, { material: { type, params: params.update(pos, item => val) } })
  }

  render () {
    const { material } = this.props
    if (!material) return null
    const { params } = material
    const materialsList = Object.keys(materialsObjects).map(i => {
      const { name, key } = materialsObjects[i]
      return { name, value: key }
    })
    const materialType = materialsObjects[material.type]

    return (
      <div>
        <Selector options={materialsList} value={material.type} />
        {materialType.params.map((item, i) =>
          <div key={i} className='row'>
            <div className='col-md-6'>
              {item.name}
            </div>
            <div className='col-md-6'>
              {item.type.name === 'number' &&
              <InputNumber
                integer={item.type.integer}
                onChange={val => this.editObject(val, item.pos)}
                value={params[item.pos]}
                min={item.type.min}
                max={item.type.max} />}
              {item.type.name === 'color' &&
              <InputColor
                value={params[item.pos]}
                onChange={val => this.editObject(val, item.pos)} />}
              {item.type.name === 'boolean' &&
              <InputBool
                value={params[item.pos]}
                onChange={val => this.editObject(val, item.pos)} />}
              {item.type.name === 'selector' &&
              <Selector
                options={item.type.options}
                value={params[item.pos]}
                onChange={val => this.editObject(val, item.pos)} />}
            </div>
          </div>)}
      </div>
    )
  }
}

export default MaterialsEditor
