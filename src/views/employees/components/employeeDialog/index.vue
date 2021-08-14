<template>
  <div>
    <el-dialog title="新增员工" :visible.sync="showDialog" width="50%" @close="handleClose">
      <el-form ref="employeeFormRef" :model="employeeForm" label-width="120px" :rules="addEmployeeRules" class="form_container">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="employeeForm.username" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="employeeForm.mobile" />
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-input v-model="employeeForm.timeOfEntry" type="date" />
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select v-model="employeeForm.formOfEmployment" placeholder="请选择" @focus="getHireTypeList">
            <el-option v-for="item in hireTypeList" :key="item.id" :label="item.value" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="employeeForm.workNumber" />
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-select v-model="employeeForm.departmentName" placeholder="请选择" @focus="getDeptList">
            <el-option v-for="item in depList" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-input v-model="employeeForm.correctingTime" type="date" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDepartments } from '@/api/departments'
import employeeNum from '@/api/constant/employees'
import { validMobile } from '@/utils/validate'
import { addEmployee } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validPhone = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    return {
      employeeForm: {
        username: '',
        mobile: '',
        timeOfEntry: '',
        formOfEmployment: 0,
        workNumber: '',
        departmentName: '',
        correctionTime: ''
      },
      addEmployeeRules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '请输入1-4位字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validPhone, trigger: 'blur' }
        ],
        timeOfEntry: [{ required: true, message: '请选择入职时间', trigger: 'blur' }],
        formOfEmployment: [{ required: true, message: '请选择聘用形式', trigger: 'blur' }],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' },
          { min: 1, max: 8, message: '请输入1-8位字符', trigger: 'blur' }
        ],
        departmentName: [{ required: true, message: '请选择部门', trigger: 'blur' }]
      },
      /* 部门列表 */
      depList: [],
      /* 雇佣类型 */
      hireTypeList: []
    }
  },
  methods: {
    handleClose() {
      this.$refs.employeeFormRef.resetFields()
      this.$emit('update:showDialog', false)
    },
    handleAdd() {
      this.$refs.employeeFormRef.validate(async valid => {
        if (valid) {
          await addEmployee(this.employeeForm)
          this.$emit('refresh')
          this.$emit('update:showDialog', false)
          this.$message.success('员工增加成功')
        }
      })
    },
    async getDeptList() {
      const { depts } = await getDepartments()
      this.depList = depts
    },
    getHireTypeList() {
      this.hireTypeList = employeeNum.informaltype
    }
  }
}
</script>
<style lang="scss" scoped>
.form_container {
  width: 80%;
}
</style>
