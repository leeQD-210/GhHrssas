const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  token: state => state.user.token, // 监听token变化并共享token
  username: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId,
  avatar: state => state.user.userInfo.staffPhoto,
  companyId: state => state.user.userInfo.companyId,
  device: state => state.app.device,
  routes: state => state.permission.routes,
  permPoints: state => state.user.userInfo.roles.points
  /*
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs */
}
export default getters
