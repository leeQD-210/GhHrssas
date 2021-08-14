<template>
  <el-row type="flex" justify="space-between" style="width:100%;">
    <el-col :span="20">
      <svg-icon :icon-class="iconClass" class-name="custom-class" /><span style="font-weight:bold;margin-left:5px">{{ treeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col :span="12">
          <div class="grid-content align-right">{{ ifRoot ? '负责人' : treeData.manager }}</div>
        </el-col>
        <el-col :span="12">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link align-right">操作<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add" :disabled="!checkPermPoints('add-depts')">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!ifRoot" command="edit">查看部门</el-dropdown-item>
              <el-dropdown-item v-if="!ifRoot" command="delete" :disabled="!checkPermPoints('del-depts')">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { deleteDepartment } from '@/api/departments'
export default {
  props: {
    treeData: {
      required: true,
      type: Object
    },
    ifRoot: {
      required: true,
      type: Boolean
    },
    iconClass: {
      required: true,
      type: String
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'add') {
        /* 触发自定义事件，在父组件监听 */
        this.$emit('addDept', this.treeData)
      } else if (command === 'edit') {
        this.$emit('editDept', this.treeData)
      } else {
        this.$confirm('确认删除当前部门吗？', '请确认')
          .then(async() => {
            await deleteDepartment(this.treeData.id)
            this.$message.success('删除部门成功')
            this.$emit('deleteDept')
          })
          .catch(() => {
            this.$message.info('删除取消')
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.align-right {
  text-align: right;
}
</style>
