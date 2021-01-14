import Vue from 'vue'
import {
  Drawer,
  Slider,
  Input,
  Pagination,
  Table,
  TableColumn,
  Loading,
  Button,
  Tooltip,
  Message,
  Icon,
  Select,
  Option,
  Dialog //

} from 'element-ui'
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Drawer)

Vue.use(Loading.directive)

Vue.prototype.$message = Message
