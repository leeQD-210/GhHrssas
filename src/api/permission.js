import request from '@/utils/request'
/* 获取权限列表 */
export function getPermissionList() {
  return request({
    url: `/sys/permission`,
    method: 'get'
  })
}
/* 添加权限 */
export function addPermission(data) {
  return request({
    url: `/sys/permission`,
    method: 'post',
    data
  })
}
/* 编辑权限 */
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}
/* 根据Id查询权限 */
export function getPermissionById(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'get'
  })
}
/* 删除权限 */
export function deletePermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
