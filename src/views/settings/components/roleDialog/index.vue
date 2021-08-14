<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="70%" @close="handleClose">
      <el-form ref="roleFormRef" :model="roleForm" label-width="80px" :rules="roleRules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" type="textarea" :rows="2" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleCommit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getRoles, addRole, getRoleInfoById, editRole } from '@/api/role'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const checkName = async(rule, value, callback) => {
      const { rows } = await getRoles()
      let isReapt = false
      /* 判断是编辑操作 */
      if (this.roleForm.id) {
        /* 排除自身找有无名称重复 */
        isReapt = rows.some(item => item.id !== this.roleForm.id && item.name === value && value.trim() !== '')
      } else {
        isReapt = rows.some(item => item.name === value && value.trim() !== '')
      }
      isReapt ? callback(new Error(`当前角色名${value}已存在`)) : callback()
    }
    return {
      roleForm: {
        name: '',
        description: ''
      },
      roleRules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 1, max: 8, message: '请输入1-8个字符', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' },
          { min: 1, max: 200, message: '请输入1-200个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dialogTitle() {
      return this.roleForm.id ? '编辑角色' : '添加角色'
    }
  },
  methods: {
    handleClose() {
      /* 重置表单 */
      this.$refs.roleFormRef.resetFields()
      /* 关闭表单 */
      this.$emit('update:dialogVisible', false)
      /* 重置储存的表单数据 */
      this.roleForm = {
        name: '',
        description: ''
      }
    },
    handleCommit() {
      this.$refs.roleFormRef.validate(async valid => {
        if (valid) {
          /* 如果是编辑操作 */
          if (this.roleForm.id) {
            await editRole(this.roleForm.id, this.roleForm)
          } else {
            /* 调用添加接口 */
            await addRole(this.roleForm)
          }
          /* 添加自定义重新渲染事件，在父组件监听 */
          this.$emit('refresh')
          /* 关闭对话框 */
          this.$emit('update:dialogVisible', false)
        }
      })
    },
    async getRoleInfoById(id) {
      this.roleForm = await getRoleInfoById(id)
    }
  }
}
</script>
