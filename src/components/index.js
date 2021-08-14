import PageTools from '@/components/pageTools'
import UploadTools from '@/components/uploadTools'
import UploadPics from '@/components/uploadPics'
import ToQrCode from '@/components/toQrCode'
import ScreenFull from '@/components/ScreenFull'
import ThemePicker from '@/components/ThemePicker'
import Lang from '@/components/lang'
import TagsView from '@/components/TagsView'
/* 注册全局组件，Vue.use()会自动调用install方法 */
export default {
  install(Vue) {
    Vue.component('page-tools', PageTools)
    Vue.component('upload-tools', UploadTools)
    Vue.component('upload-pics', UploadPics)
    Vue.component('to-qrcode', ToQrCode)
    Vue.component('screen-full', ScreenFull)
    Vue.component('theme-picker', ThemePicker)
    Vue.component('lang', Lang)
    Vue.component('tags-view', TagsView)
  }
}
