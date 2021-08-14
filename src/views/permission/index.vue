<template>
  <div>
    <el-card>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="openDialog('0',0)">
          <i class="el-icon-edit"></i>
          添加菜单
        </el-button>
      </el-row>
      <el-table :data="permissionList" style="width: 100%" center border row-key="id">
        <el-table-column label="菜单名称">
          <template v-slot="{row}">
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="权限标识" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作" width="400px">
          <template v-slot="{ row }">
            <el-row type="flex" justify="space-around">
              <a href="#" @click.prevent="openDialog(row.id,row.type)">添加权限点</a>
              <a href="#" @click.prevent="openDialog(row.id)">修改</a>
              <a href="#" @click.prevent="deletePerm(row.id)">删除</a>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="showDialog" :title="title" @close="handleClose">
        <el-form ref="addPermFormRef" :model="dataForm" label-width="80px" :rules="addPermRules">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="dataForm.name" type="text" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="dataForm.code" type="text" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="dataForm.decrisption" type="text" />
          </el-form-item>
          <el-form-item label="企业可见">
            <span :class="{highlight:dataForm.enVisible==='0'}">不可见</span>
            <el-switch
              v-model="dataForm.enVisible"
              :active-value="'1'"
              :inactive-value="'0'"
              style="margin:0 5px"
            />
            <span :class="{highlight:dataForm.enVisible==='1'}">可见</span>
          </el-form-item>
        </el-form>
        <template v-slot:footer>
          <el-row type="flex" justify="center">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
          </el-row>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getPermissionList, getPermissionById, addPermission, updatePermission, deletePermission } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      permissionList: [],
      dataForm: {
        name: '', // 权限名称
        code: '', // 权限标识
        decrisption: '', // 权限描述
        enVislble: '0', // 企业可见
        type: '', // 权限级别
        pid: '' // 权限父级id
      },
      showDialog: false,
      addPermRules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    title() {
      return this.dataForm.id ? '编辑权限' : '添加权限'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const result = await getPermissionList()
      this.resultList = result
      this.permissionList = tranListToTreeData(result, '0')
    },
    /* 添加权限点 */
    async openDialog(id, type) {
      console.log(id)
      console.log(type)
      /* 添加操作会传入type */
      if (type || type === 0) {
        /* 因为是添加子节点，当前传入Id为父id，当前type需+1*/
        this.dataForm.pid = id
        this.dataForm.type = type + 1
      } else {
        /* 当前时编辑操作 */
        this.dataForm = await getPermissionById(id)
      }
      this.showDialog = true
    },
    /* 查看api权限 */
    showPermApi(id) {},
    /* 查看权限 */
    showPerm(id) {},
    /* 删除权限 */
    deletePerm(id) {
      this.$confirm('确定删除该权限吗？', '请确认').then(async() => {
        await deletePermission(id)
        this.$message.success('权限删除成功')
        this.getPermissionList()
      })
        .catch(() => {
          this.$message.info('取消删除')
        })
    },
    /* 关闭添加编辑弹窗 */
    handleClose() {
      this.showDialog = false
      /* 清空表单 */
      this.$refs.addPermFormRef.resetFields()
      /* 重置表单对象 */
      this.dataForm = {
        name: '', // 权限名称
        code: '', // 权限标识
        decrisption: '', // 权限描述
        enVislble: '0', // 企业可见
        type: '', // 权限级别
        pid: '' // 权限父级id
      }
    },
    handleSubmit() {
      this.$refs.addPermFormRef.validate(async valid => {
        if (valid) {
          if (this.dataForm.id) {
            /* id存在说明是编辑操作 */
            await updatePermission(this.dataForm)
            this.$message.success('权限修改成功')
          } else {
            await addPermission(this.dataForm)
            this.$message.success('添加权限成功')
          }
          this.showDialog = false
          this.getPermissionList()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  a{
    color:#409Eff
  }
  .highlight{
    color:#409Eff
  }
</style>
