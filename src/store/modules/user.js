import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserInfoById } from '@/api/user.js'
import { resetRouter } from '@/router'
const state = {
  // 初始化token
  token: getToken(),
  userInfo: {}
}
const mutations = {
  /* 更新token */
  updateToken(state, newToken) {
    /* 设置vuex中的token */
    state.token = newToken
    /* 设置存储的token */
    setToken(newToken)
  },
  /* 删除token */
  removeToken(state) {
    /* 清空vuex中的token */
    state.token = null
    /* 删除本地存储的token */
    removeToken()
  },
  /* 更新用户信息 */
  setUserInfo(state, result) {
    state.userInfo = result
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async loginUser(context, data) {
    /* 经过响应拦截器处理，此时result为响应数据中的data,且请求失败的情况已在响应拦截器中处理了 */
    const result = await login(data)
    /* 请求成功更新vuex及本地存储的token */
    context.commit('updateToken', result)
    /* 保存当前时间戳 */
    setTimeStamp()
  },
  async getUserInfo(context) {
    /* 调用getUserInfo接口 */
    const result = await getUserInfo()
    const baseInfo = await getUserInfoById(result.userId)
    const baseResult = { ...result, ...baseInfo }
    /* 更新用户信息 */
    context.commit('setUserInfo', baseResult)
    return result
  },
  async logout(context) {
    /* 清除token */
    context.commit('removeToken')
    /* 清除用户信息 */
    context.commit('removeUserInfo')
    /* 路由每次登录时都在添加，需要在退出登录时重置重置路由 */
    resetRouter()
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
