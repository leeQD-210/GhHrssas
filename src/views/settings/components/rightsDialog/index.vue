<template>
  <div>
    <el-dialog title="分配权限" :visible.sync="showRights" width="70%" @close="handleClose">
      <el-tree
        ref="treeTable"
        :data="rightsData"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="checkedKey"
        :check-strictly="true"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleCommit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getRights, assignRightsByRoleId } from '@/api/rights'
import { tranListToTreeData } from '@/utils/index'
import { getRoleInfoById } from '@/api/role'
export default {
  props: {
    showRights: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rightsData: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      checkedKey: [],
      rowId: ''
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:showRights', false)
    },
    async handleCommit() {
      /* 仅获取叶子节点组成的数组 */
      const permIds = this.$refs.treeTable.getCheckedKeys()
      console.log(permIds)
      if (permIds.length > 0) {
        await assignRightsByRoleId({ id: this.rowId, permIds: permIds })
        this.$message.success('权限操作成功')
      } else {
        return this.$message.error('当前未选中任何权限')
      }
      this.$emit('update:showRights', false)
    },
    async getRights(id) {
      const rightsArr = await getRights()
      this.rowId = id
      const roleInfo = await getRoleInfoById(id)
      this.checkedKey = roleInfo.permIds
      /* 将列表型数据转化为树形 */
      this.rightsData = tranListToTreeData(rightsArr, '0')
    }
  }
}
</script>
