// 按需全局引入 vant组件
import Vue from 'vue'
import { Button, List, Cell, Tabbar, TabbarItem, NavBar, Icon, Popup, Overlay, Picker } from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Popup)
Vue.use(Tabbar)
Vue.use(Overlay)
Vue.use(Picker)
Vue.use(TabbarItem)
Vue.use(Tabbar).use(TabbarItem)
