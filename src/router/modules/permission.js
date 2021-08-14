import permission from '@/views/permission'
import Layout from '@/layout'
export default {
  path: '/permissions',
  name: 'permissions',
  /* 基础布局 */
  component: Layout,
  children: [
    {
      path: '',
      name: 'permissions',
      component: permission,
      meta: {
        /* 通过meta属性中的title获取路由对应的名称，渲染在侧边栏 */
        title: '权限',
        icon: 'lock'
      }
    }
  ]
}
