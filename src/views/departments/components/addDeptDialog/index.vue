<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="70%" @close="handleClose">
      <el-form ref="addDeptFormRef" :model="addDeptForm" label-width="120px" :rules="addDeptRules">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="addDeptForm.name" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="addDeptForm.code" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select v-model="addDeptForm.manager" placeholder="请选择" @focus="getEmployeeSimple">
            <el-option v-for="item in employeeList" :key="item.id" :label="item.username" :value="item.username" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="addDeptForm.introduce" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addDept">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDepartments, addDepartment } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
import { getDeptDetails } from '@/api/departments'
import { editDepartment } from '@/api/departments'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    treeData: {
      type: Object,
      default: null
    }
  },
  data() {
    /* 验证部门名称是否重复 */
    const checkName = async(rule, value, callback) => {
      /* 获取最新的部门数据 */
      const { depts } = await getDepartments()
      let isRepeat
      /* 判断是添加操作还是编辑操作 */
      if (this.addDeptForm.id) {
        /* 过滤出除自身外的同级部门 */
        isRepeat = depts.filter(item => item.id !== this.addDeptForm.id && item.pid === this.addDeptForm.pid).some(item => item.name === value)
      } else {
        /* 判断要添加的部门名称在同级部门下有没有重复 */
        /* 过滤出当前编辑部门下的子部门数组，在查找是否有名称相同的部门 */
        isRepeat = depts.filter(item => item.pid === this.treeData.id).some(item => item.name === value)
      }
      isRepeat ? callback(new Error(`同级部门下已有${value}`)) : callback()
    }
    /* 验证部门编码是否重复 */
    const checkCode = async(rule, value, callback) => {
      /* 获取最新的部门数据 */
      const { depts } = await getDepartments()
      let isRepeat
      /* 判断是添加操作还是编辑操作 */
      if (this.addDeptForm.id) {
        /* 编辑模式下需要除去自己 */
        isRepeat = depts.some(item => item.id !== this.addDeptForm.id && item.code === value && value.trim() !== '')
      } else {
        /* 所以部门编码中 */
        isRepeat = depts.some(item => item.code === value && value.trim() !== '')
      }
      isRepeat ? callback(new Error('部门编码不能重复')) : callback()
    }
    return {
      /* 添加部门数据 */
      addDeptForm: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      addDeptRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '请输入1-50字符', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '请输入1-50字符', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 200, message: '请输入1-200字符', trigger: 'blur' }
        ]
      },
      employeeList: []
    }
  },
  computed: {
    dialogTitle() {
      return this.addDeptForm.id ? '编辑部门' : '添加部门'
    }
  },
  methods: {
    async getEmployeeSimple() {
      this.employeeList = await getEmployeeSimple()
    },
    addDept() {
      this.$refs.addDeptFormRef.validate(async valid => {
        if (valid) {
          /* 判断当前是添加操作还是编辑操作 */
          if (this.addDeptForm.id) {
            /* 编辑部门 */
            await editDepartment(this.addDeptForm.id, this.addDeptForm)
            this.$message.success('编辑部门成功')
          } else {
            /* 添加部门 */
            await addDepartment({ ...this.addDeptForm, pid: this.treeData.id })
            this.$message.success('添加部门成功')
          }
          /* 定义自定义事件，传递给父组件 */
          this.$emit('refreshTable')
          /* 关闭对话框 */
          this.$emit('update:dialogVisible', false)
        }
      })
    },
    handleClose() {
      /*  */
      /* 重置表单 */
      this.$refs.addDeptFormRef.resetFields()
      /* 还原存储数据的对象 */
      this.addDeptForm = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      /* sync语法糖，update:props */
      this.$emit('update:dialogVisible', false)
    },
    async getDeptDetails(id) {
      this.addDeptForm = await getDeptDetails(id)
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
