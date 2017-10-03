// We only need to import the modules necessary for initial render
import EditorLayout from '../layouts/Editor/Editor.layout'
import Editor from './Editor'

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: EditorLayout,
  indexRoute: Editor,
  childRoutes: [],
})

export default createRoutes
