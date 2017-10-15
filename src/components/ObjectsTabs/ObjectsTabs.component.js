import React, { Component } from 'react'

import GeometriesCreator from 'components/GeometriesCreator/GeometriesCreator.component'
import LightsCreator from 'components/LightsCreator/LightsCreator.component'

import { Tabs, Icon } from 'antd'
const TabPane = Tabs.TabPane

class ObjectsTabs extends Component {
  state = { tabIndex: 0 }

  render () {
    const { tabIndex } = this.state
    const tabs = [
      { icon: 'api', name: 'geometries', component: <GeometriesCreator /> },
      { icon: 'bulb', name: 'lights', component: <LightsCreator /> },
    ]
    const tab = tabs[tabIndex]
    return (
      <div>
        <Tabs type='card' onChange={tabIndex => this.setState({ tabIndex })}>
          {tabs.map((item, i) => <TabPane key={i} tab={<Icon type={item.icon} />} />)}
        </Tabs>
        {tab.component}
      </div>
    )
  }
}

export default ObjectsTabs
