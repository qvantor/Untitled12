import React from 'react'
import PropTypes from 'prop-types'

import HotKeys from 'components/HotKeys/HotKeys.component'
import GeometriesCreator from 'components/GeometriesCreator/GeometriesCreator.component'
import PositionEditor from 'components/PositionEditor/PositionEditor.component'
import RotationEditor from 'components/RotationEditor/RotationEditor.component'
import ScaleEditor from 'components/ScaleEditor/ScaleEditor.component'
import GeometriesEditor from 'components/GeometriesEditor/GeometriesEditor.component'

import { Layout } from 'antd'
const { Header, Sider } = Layout

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
            <GeometriesCreator />
            <PositionEditor />
            <RotationEditor />
            <ScaleEditor />
            <GeometriesEditor />
          </div>
        </Sider>
      </Layout>
    </Layout >
  </HotKeys>

EditorLayout.propTypes = {
  children: PropTypes.node,
}

export default EditorLayout
