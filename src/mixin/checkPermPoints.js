import { mapGetters } from 'vuex'
/* 检查权限功能点 */
export default {
  computed: {
    ...mapGetters(['permPoints'])
  },
  methods: {
    checkPermPoints(key) {
      /* 返回false表示没有该权限 */
      return (this.permPoints && this.permPoints.some(item => item === key))
    }
  }
}
