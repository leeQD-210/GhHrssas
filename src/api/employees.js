import request from '@/utils/request'
/* 获取员工简单信息 */
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple',
    method: 'get'
  })
}
/* 获取员工基本信息 */
export function getEmployeeInfo(page, size) {
  return request({
    url: '/sys/user',
    methods: 'get',
    params: { page: page, size: size }
  })
}
/* 删除员工 */
export function deleteEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
/* 添加员工 */
export function addEmployee(data) {
  return request({
    url: `/sys/user`,
    method: 'post',
    data
  })
}
/* 批量导入员工 */
export function addMutiEmployee(data) {
  return request({
    url: `/sys/user/batch`,
    method: 'post',
    data
  })
}
/* 获取员工详情 */
export function getEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}
/* 修改用户基本信息 */
export function editEmployeeDetail(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
/* 获取员工个人详情 */
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'get'
  })
}
/* 更新员工个人详情 */
export function updatePersonalDetail(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}
/* 获取员工岗位详情 */
export function getUserJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`,
    method: 'get'
  })
}
/* 更新员工岗位详情 */
export function updataUserJobDetail(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
/* 分配角色 */
export function assignUserRole(data) {
  return request({
    url: `/sys/user/assignRoles`,
    method: 'put',
    data
  })
}
