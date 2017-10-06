import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setTool } from 'store/editor/editor.actions'

import { Button } from 'antd'

@connect((store) => ({ tool: store.editor.tool, }), { setTool })
class ToolSelector extends Component {
  static propTypes = {
    tool: PropTypes.string,
    setTool: PropTypes.func,
  }

  // @todo find and set relative icons
  render () {
    const { tool, setTool } = this.props
    const tools = [
      { name: 'Translate', key: 'translate' },
      { name: 'Scale', key: 'scale' },
    ]

    return (
      <div>
        {tools.map(item =>
          <Button
            size='small'
            onClick={e => setTool(item.key)}
            type={tool === item.key ? 'primary' : null}
            key={item.key} ghost>
            {item.name}
          </Button>)}
      </div>
    )
  }
}

export default ToolSelector
