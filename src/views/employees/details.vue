<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录账号设置" name="first">
          <el-form ref="userInfoFormRef" :model="userInfo" label-width="80px" class="loginSet_container" :rules="userFormRules">
            <el-form-item label="用户名:" props="username">
              <el-input v-model="userInfo.username" />
            </el-form-item>
            <el-form-item label="密码:" props="password2">
              <el-input v-model="userInfo.password2" type="password" />
            </el-form-item>
            <el-row type="flex" justify="center">
              <el-form-item>
                <el-button type="primary" @click="handleEdit">修改</el-button>
                <el-button @click="$router.back()">返回</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情" name="second">
          <component :is="userInfoComponent" />
        </el-tab-pane>
        <el-tab-pane label="岗位信息" name="third">
          <component :is="jobInfoComponent" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { getEmployeeDetail, editEmployeeDetail } from '@/api/employees'
import UserInfo from '@/views/employees/components/User-info'
import JobInfo from '@/views/employees/components/Job-info'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      userId: this.$route.params.id,
      activeName: 'first',
      userInfo: {
        username: '',
        password2: ''
      },
      userFormRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '请输入1-8字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 8, message: '请输入6-8字符', trigger: 'blur' }
        ]
      },
      userInfoComponent: UserInfo,
      jobInfoComponent: JobInfo
    }
  },
  created() {
    this.getEmployeeInfo()
  },
  methods: {
    async getEmployeeInfo() {
      console.log(this.$router)
      this.userInfo = await getEmployeeDetail(this.userId)
    },
    handleEdit() {
      this.$refs.userInfoFormRef.validate(async valid => {
        if (valid) {
          const newObj = { ...this.userInfo, password: this.userInfo.password2 }
          console.log(newObj)
          await editEmployeeDetail(newObj)
          this.$message.success('用户名及密码修改成功')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.loginSet_container {
  width: 400px;
  height: 300px;
  margin: 100px auto;
}
</style>
