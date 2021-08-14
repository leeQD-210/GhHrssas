<template>
  <div>
    <upload-tools :on-success="handleUpload" />
  </div>
</template>
<script>
import { addMutiEmployee } from '@/api/employees'
export default {
  methods: {
    async handleUpload(obj) {
      const connections = {
        '姓名': 'username',
        '工号': 'workNumber',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '转正日期': 'correctionTime'
      }
      /* 迭代原始数组 */
      const resultArr = obj.results.map(item => {
        const obj = {}
        /* 对原数组属性组成的数组遍历 */
        Object.keys(item).forEach(key => {
          /* 当属性名是日期格式时 */
          if (connections[key] === 'timeOfEntry' || connections[key] === 'correctionTime') {
            /* 将excel时间格式转化位时间戳格式 */
            obj[connections[key]] = new Date(this.formatDate(item[key], '/'))
            return
          }
          obj[connections[key]] = item[key]
        })
        return obj
      })
      await addMutiEmployee(resultArr)
      this.$message.success('员工导入成功')
      this.$router.back()
    },
    /* 转换日期格式 */
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>
