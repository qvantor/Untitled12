import React, { Component } from 'react'

import ObjectsEditor from '../ObjectsEditor/ObjectsEditor.component'
import MaterialsEditor from '../MaterialsEditor/MaterialsEditor.component'
import PositionEditor from '../PositionEditor/PositionEditor.component'
import RotationEditor from '../RotationEditor/RotationEditor.component'
import ScaleEditor from '../ScaleEditor/ScaleEditor.component'

import { Tabs, Icon } from 'antd'

const TabPane = Tabs.TabPane

class PropertiesTabs extends Component {
  state = { tabIndex: 0 }

  render () {
    const { tabIndex } = this.state
    const tabs = [
      {
        name: 'Object',
        component: <div>
          <PositionEditor />
          <RotationEditor />
          <ScaleEditor />
        </div>,
      },
      { name: 'Parameters', component: <ObjectsEditor /> },
      { name: 'Material', component: <MaterialsEditor /> },
    ]
    const tab = tabs[tabIndex]
    return (
      <div className='panel'>
        <Tabs type='card' onChange={tabIndex => this.setState({ tabIndex })}>
          {tabs.map((item, i) => <TabPane key={i} tab={item.name} />)}
        </Tabs>
        {tab.component}
      </div>
    )
  }
}

export default PropertiesTabs
