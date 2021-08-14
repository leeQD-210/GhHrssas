import departments from '@/views/departments'
import Layout from '@/layout'
export default {
  path: '/departments',
  name: 'departments',
  /* 基础布局 */
  component: Layout,
  children: [
    {
      path: '',
      name: 'departments',
      component: departments,
      meta: {
        /* 通过meta属性中的title获取路由对应的名称，渲染在侧边栏 */
        title: '组织架构',
        icon: 'tree'
      }
    }
  ]
}
