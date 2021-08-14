import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const Timeout = 3600 // 设定token失效时间
const service = axios.create({
  /* 取不同环境下的接口基础地址，因为生产环境配置了proxy代理，生产环境的baseURL要和配置的代理地址一致 */
  baseURL: process.env.VUE_APP_BASE_API,
  /* 设置响应时间 */
  timeout: 5000
})
// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      /* 如果当前时间戳-保存token时的时间戳>设低的失效时间，表示token已失效，续重新登录 */
      if ((Date.now() - getTimeStamp()) / 1000 > Timeout) {
        store.dispatch('user/logout')
        router.push('/login')
      }
      /* 每次请求时请求头中添加token字段 */
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(new Error(error))
  }
)

// response interceptor
service.interceptors.response.use(
  /* 响应成功回调 */
  response => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      /* 弹出响应的提示消息 */
      Message.error(message)
      /* 抛出错误对象，使其进入catch捕获 */
      return Promise.reject(new Error(message))
    }
  },
  /* 响应失败回调 */
  error => {
    /* 后端响应100002代码表示token已失效 */
    if (error.response && error.response.data && error.response.data.code === 10002) {
      store.commit('user/logout')
      router.push('/login')
    } else {
      /* 响应进入错误时，弹出错误信息并将promise进入catch捕获error */
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
