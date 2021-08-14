import request from '@/utils/request'
export function getRoles() {
  return request({
    url: '/sys/role',
    method: 'get'
  })
}
/* 获取公司信息 */
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`,
    method: 'get'
  })
}
/* 添加角色 */
export function addRole(data) {
  return request({
    url: `/sys/role`,
    method: 'post',
    data
  })
}
/* 删除角色 */
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
/* 根据Id获取角色信息 */
export function getRoleInfoById(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'get'
  })
}
/* 根据id修改角色 */
export function editRole(id, data) {
  return request({
    url: `/sys/role/${id}`,
    method: 'put',
    data
  })
}

