import React, { Component } from 'react'
import Scene from '../Scene/Scene.component'

class EditorView extends Component {
  state = {
    height: 400,
    width: 400,
  }

  componentWillMount () {
    window.addEventListener('optimizedResize', this.countChartsHeight)
  }

  componentDidMount () {
    if (__DEV__) {
      setTimeout(this.countChartsHeight, 500)
    } else {
      this.countChartsHeight()
    }
  }

  countChartsHeight = () => {
    if (!this.refs.editor) return
    const rect = this.refs.editor.getBoundingClientRect()
    this.setState({
      height: rect.height,
      width: rect.width,
    })
  }

  componentWillUnmount () {
    window.removeEventListener('optimizedResize', this.countChartsHeight)
  }

  render () {
    const { height, width } = this.state
    return (
      <div ref='editor' style={{ height: '100%' }} onClick={e => this.refs.editor.focus()}>
        <Scene id={1} width={width} height={height} />
      </div>)
  }
}

export default EditorView
