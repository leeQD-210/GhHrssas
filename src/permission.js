import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login', '/404']
/* 路由前置守卫 */
router.beforeEach(async(to, from, next) => {
  /* 开启进度条 */
  NProgress.start()
  /* 如果有token */
  if (store.getters.token) {
    /* 有token的情况下判断用户信息是否存在,不存在就获取 */
    if (!store.getters.userId) {
      const { roles } = await store.dispatch('user/getUserInfo')
      /* 这里获取完用户信息可以拿到用户角色信息下的menus来添加动态路由 */
      const results = await store.dispatch('permission/getAsyncRoutes', roles.menus)
      // 404 page must be placed at the end !!!
      // 404页面必须放最下面，上面路由都没有被匹配时，其余所有路由匹配404路由
      const nonePage = { path: '*', redirect: '/404', hidden: true }
      /* 把404路由放到所有路由最后 */
      results.push(nonePage)
      router.addRoutes(results)
      next(to.path) // 因为添加路由时异步操作, 这里必须要先next(to.path),否则刷新后路由会小时
    }
    /* 如果访问登录页面则直接跳转主页 */
    if (to.path === '/login') {
      next('/')
    } else {
      /* 访问其他页面则放行 */
      next()
    }
  } else {
    /* 没有token情况下，如果访问白名单路径,直接放行*/
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      /* 访问其他页面跳转到login页面 */
      next('/login')
    }
  }
  /* 手动关闭进度条 */
  NProgress.done()
})
/* 后置守卫 */
router.afterEach(() => {
  /* 关闭进度条 */
  NProgress.done()
})
