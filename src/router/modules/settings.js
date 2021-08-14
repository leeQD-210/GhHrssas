import settings from '@/views/settings'
import Layout from '@/layout'
export default {
  path: '/settings',
  /* 基础布局 */
  name: 'settings',
  component: Layout,
  children: [
    {
      path: '',
      name: 'settings',
      component: settings,
      meta: {
        /* 通过meta属性中的title获取路由对应的名称，渲染在侧边栏 */
        title: '设置',
        icon: 'setting'
      }
    }
  ]
}
