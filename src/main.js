// import 'core-js/stable'
// import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import './plugins/element-ui'
import initTronWeb from './utils/tronwebFn'
// import './plugins/element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import 'amfe-flexible';
import 'element-ui/lib/theme-chalk/index.css'
import './components'


Vue.prototype.$http=axios
Vue.prototype.$initTronWeb = initTronWeb
// 全局引入按需引入UI库 vant
// import '@/plugins/vant'
// 引入全局样式
// import '@/assets/css/index.scss'
// 移动端适配
// import 'lib-flexible/flexible.js'
// import './styles/index.less'
// filters
import './filters'
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
