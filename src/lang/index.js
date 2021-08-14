import Vue from 'vue'
/* 引入国际化包 */
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
/* 引入elementui中文包 */
import elementZH from 'element-ui/lib/locale/lang/zh-CN'
/* 引入elementui英文包 */
import elementEN from 'element-ui/lib/locale/lang/en'
/* 引入自定义的中文包 */
import customZH from './zh'
/* 引入自定义的英文包 */
import customEN from './en'
/* 注册国际化包 */
Vue.use(VueI18n)
export default new VueI18n({
  /* 如果cookie中没有当前语言值，则默认中文 */
  locale: Cookies.get('languange') || 'zh',
  messages: {
    en: {
      ...elementEN,
      ...customEN
    },
    zh: {
      ...elementZH,
      ...customZH
    }
  }
})
