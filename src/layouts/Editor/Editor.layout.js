import React from 'react'
import PropTypes from 'prop-types'

import HotKeys from 'components/HotKeys/HotKeys.component'
import PositionEditor from 'components/PositionEditor/PositionEditor.component'
import RotationEditor from 'components/RotationEditor/RotationEditor.component'
import ScaleEditor from 'components/ScaleEditor/ScaleEditor.component'
import GeometriesEditor from 'components/GeometriesEditor/GeometriesEditor.component'
import ToolSelector from 'components/ToolSelector/ToolSelector.component'
import ObjectsTabs from 'components/ObjectsTabs/ObjectsTabs.component'

import { Layout } from 'antd'
const { Header, Sider, Footer } = Layout

export const EditorLayout = ({ children }) =>
  <HotKeys>
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Header className='header' style={{ height: 20 }} />
      <Layout>
        <Layout>
          {children}
        </Layout>
        <Sider width={260}>
          <div className='p-10 p-top-bottom-0 panels'>
            <ObjectsTabs />
            <PositionEditor />
            <RotationEditor />
            <ScaleEditor />
            <GeometriesEditor />
          </div>
        </Sider>
      </Layout>
      <Footer>
        <ToolSelector />
      </Footer>
    </Layout>
  </HotKeys>

EditorLayout.propTypes = {
  children: PropTypes.node,
}

export default EditorLayout
