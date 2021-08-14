<template>
  <div>
    <el-dialog :visible.sync="showAssignRole" title="分配角色" @close="handleClose">
      <el-checkbox-group v-model="checkList" class="checklist">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id" class="inputbox">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleCommit">确认</el-button>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getRoles } from '@/api/role'
import { getUserInfoById } from '@/api/user'
import { assignUserRole } from '@/api/employees'
export default {
  props: {
    showAssignRole: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkList: [],
      roleList: [],
      userId: ''
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoles({ page: 1, pagesize: 20 })
      console.log(rows)
      this.roleList = rows
    },
    async getUserInfo(id) {
      const { roleIds } = await getUserInfoById(id)
      this.userId = id
      this.checkList = roleIds
    },
    handleClose() {
      this.$emit('update:showAssignRole', false)
    },
    async handleCommit() {
      await assignUserRole({ id: this.userId, roleIds: this.checkList })
      this.$emit('update:showAssignRole', false)
      this.$message.success('分配角色权限成功')
    }
  }
}
</script>
<style lang="scss" scoped>
  .checklist{
    display: flex;
    justify-content: start;
    flex-flow: row wrap;
    .inputbox{
      margin-top: 10px;
    }
  }
</style>
