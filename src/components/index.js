import Vue from 'vue'

const componentsContext = require.context('./', true, /\.vue$/)

componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  const ctrl = componentConfig.default
  Vue.component(ctrl.name, ctrl)
})
