import DefaultTheme from 'vitepress/theme'
import KnowledgeHome from './components/KnowledgeHome.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('KnowledgeHome', KnowledgeHome)
  }
}
