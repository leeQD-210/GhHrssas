import request from '@/utils/request'
/* 获取权限详情 */
export function getRights() {
  return request({
    url: `/sys/permission`,
    method: 'get'
  })
}
/* 给角色分配权限 */
export function assignRightsByRoleId(data) {
  return request({
    url: `/sys/role/assignPrem`,
    method: 'put',
    data
  })
}
