<template>
  <div>
    <el-dialog :title="title" :visible="showDialog" @close="handleClose">
      <label class="label">申请类型 </label>
      <el-select v-model="applyForm.processKey" placeholder="请选择" style="width:220px" @change="handleChange">
        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.value" />
      </el-select>
      <el-form v-if="applyForm.processName === '加班'" ref="applyOtFormRef" v-model="applyForm" label-width="120px" :rules="otFormRules">
        <el-form-item label="加班开始时间" prop="otStartTime">
          <el-date-picker v-model="applyForm.otStartTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" />
        </el-form-item>
        <el-form-item label="加班结束时间" prop="otEndTime">
          <el-date-picker v-model="applyForm.otEndTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" />
        </el-form-item>
        <el-form-item label="补偿方式">
          你有得选吗，啥也不是！！！
        </el-form-item>
        <el-form-item label="加班原因" prop="reason">
          <el-input v-model="applyForm.reason" type="textarea" :autosize="{ minRows: 3, maxRows: 8 }" />
        </el-form-item>
      </el-form>
      <el-form v-else-if="applyForm.processName === '离职'" ref="applyDepartFormRef" v-model="applyForm" label-width="120px" :rules="departFormRules">
        <el-form-item label="期望离职时间" prop="departTime">
          <el-date-picker v-model="applyForm.departTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" />
        </el-form-item>
        <el-form-item label="离职原因" prop="reason">
          <el-input v-model="applyForm.reason" type="textarea" :autosize="{ minRows: 3, maxRows: 8 }" />
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="handleCommit">提交</el-button>
          <el-button @click="handleClose">关闭</el-button>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { startProcess } from '@/api/approvals'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [
        { id: 1, label: '加班', value: 'process_overtime' },
        { id: 2, label: '离职', value: 'process_dismission' }
      ],
      applyForm: {
        otStartTime: '',
        otEndTime: '',
        processKey: '',
        processName: '',
        reason: '',
        departTime: ''
      },
      otFormRules: {
        processKey: [{ required: true, message: '申请类型不能为空', trigger: 'blur' }],
        otStartTime: [{ required: true, message: '加班开始时间不能为空', trigger: 'blur' }],
        otEndTime: [{ required: true, message: '加班结束时间不能为空', trigger: 'blur' }],
        reason: [{ required: true, message: '原因不能为空', trigger: 'blur' }]
      },
      departFormRules: {
        departTime: [{ required: true, message: '离职时间不能为空', trigger: 'blur' }],
        reason: [{ required: true, message: '原因不能为空', trigger: 'blur' }]
      },
      userInfo: this.$store.state.user.userInfo
    }
  },
  computed: {
    title() {
      return this.applyForm.processName + '申请'
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:showDialog', false)
      this.$refs.applyOtFormRef && this.$refs.applyOtFormRef.resetFields()
      this.$refs.applyDepartFormRef && this.$refs.applyDepartFormRef.resetFields()
      this.applyForm.processName = ''
      this.applyForm.processKey = ''
    },
    async handleCommit() {
      console.log(this.$refs.applyOtFormRef)
      console.log(this.$refs.applyDepartFormRef)
      if (!this.applyForm.processKey) return this.$message.error('请选择申请类型')
      if (this.$refs.applyOtFormRef) {
        this.$refs.applyOtFormRef.validate(async valid => {
          if (valid) {
            await startProcess({ ...this.applyForm, userId: this.userInfo.userId })
          }
        })
      }
      if (this.$refs.applyDepartFormRef) {
        this.$refs.applyDepartFormRef.validate(async valid => {
          await startProcess({ ...this.applyForm, userId: this.userInfo.userId })
        })
      }
      this.$message.success('申请流程成功')
      this.handleClose()
    },
    /* 选择申请类型 */
    handleChange(val) {
      this.applyForm.processName = val === 'process_overtime' ? '加班' : '离职'
    }
  }
}
</script>
<style lang="scss" scoped>
	.label{
		display: inline-block;
		width:120px;
		text-align: right;
		padding-right: 12px;
	}
</style>
