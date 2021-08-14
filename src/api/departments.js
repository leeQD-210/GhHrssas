import request from '@/utils/request'
export function getDepartments() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}
// 删除部门
export function deleteDepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete' // restful风格
  })
}
// 添加部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
export function getDeptDetails(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'get'
  })
}
export function editDepartment(id, data) {
  return request({
    url: `/company/department/${id}`,
    method: 'put',
    data
  })
}
