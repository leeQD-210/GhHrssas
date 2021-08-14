import Vue from 'vue'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
// import enLang from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
/* 引入打印插件 */
import Print from 'vue-print-nb'
/* 引入自定义组件 */
import components from './components'
/* 引入i18n实例 */
import i18n from './lang'
import { dateFormat } from './filters'
/* 引入混入对象，用于检查是否有功能权限 */
import checkPermPoints from './mixin/checkPermPoints'
/* 导入所有自定义指令，保存到directives对象中 */
import * as directives from './directive'
import './icons' // icon
import './permission' // permission control
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  // 如果使用中文，无需设置，请删除
  i18n: (key, value) => i18n.t(key, value)
})
/* 注册自定义组件 */
Vue.use(components)
/* 定义过滤器 */
Vue.filter('dateFormat', dateFormat)
/* 全局混入，可以在每个组件中使用，检查是否含有改功能点 */
Vue.mixin(checkPermPoints)
/* Object.keys可以将对象转化为数组 */
/* 遍历指令对象，将其注册为全局自定义指令 */
Object.keys(directives).forEach(item => {
  Vue.directive(item, directives[item])
})
/* 安装打印插件 */
Vue.use(Print)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
