import { constantRoutes, asyncRoutes } from '@/router' // 引入静态路由
const state = {
  routes: [...constantRoutes]
}
const mutations = {
  /* 合并静态路由和新传入的动态路由 */
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  /* 获取动态路由，并提交setRoutes方法 */
  /* 将用户的角色信息下menus数据作为参数传入，menus存放的权限路由名称*/
  /* menus:['settings','permissions',...] */
  getAsyncRoutes(context, menus) {
    const accessRoutes = []
    menus.forEach(item => {
      /* 从动态路由列表中筛选出选中权限对应的路由名称放入通过的路由数组中 */
      return accessRoutes.push(...asyncRoutes.filter(key => key.name === item))
    })
    /* 提交合并路由方法,合并静态动态路由,用于左侧菜单显示 */
    context.commit('setRoutes', accessRoutes)
    /* 返回权限通过的动态路由数组 */
    return accessRoutes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
