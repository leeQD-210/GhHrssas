import employees from '@/views/employees'
import details from '@/views/employees/details'
import print from '@/views/employees/print'
import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  /* 基础布局 */
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: employees,
      meta: {
        /* 通过meta属性中的title获取路由对应的名称，渲染在侧边栏 */
        title: '员工',
        icon: 'people'
      }
    },
    {
      path: '/details/:id',
      component: details,
      hidden: true,
      meta: {
        title: '员工详情'
      }
    },
    {
      path: '/print/:id',
      component: print,
      hidden: true,
      meta: {
        title: '打印'
      }
    }
  ]
}
