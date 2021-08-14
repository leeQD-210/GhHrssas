<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="角色管理" name="role">
          <div class="role_wrapper">
            <el-button type="primary" style="width:120px" @click="handleAdd">十 新增角色</el-button>
            <el-table :data="tableData" style="width: 100%" center border>
              <el-table-column label="序号" width="180" type="index" />
              <el-table-column prop="name" label="角色名" width="180" sortable />
              <el-table-column prop="description" label="描述" sortable />
              <el-table-column label="操作" width="350px">
                <template v-slot="{ row }">
                  <el-row type="flex" justify="space-around">
                    <el-button type="primary" @click="handleAssign(row.id)">分配权限</el-button>
                    <el-button type="warning" @click="handleEdit(row.id)">编辑</el-button>
                    <el-button type="danger" @click.prevent="handleDelete(row.id)">删除</el-button>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="role_pagination" :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="total" />
          </div>
          <role-dialog ref="roleDialogRef" :dialog-visible.sync="dialogVisible" @refresh="initData" />
          <rights-dialog ref="rightsDialogRef" :show-rights.sync="showRights" />
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="company">
          <div class="company_info">
            <el-form ref="form" :model="companyForm" label-width="80px">
              <el-form-item label="企业名称">
                <el-input v-model="companyForm.name" disabled />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyForm.companyAddress" disabled />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="companyForm.companyPhone" disabled />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyForm.mailbox" disabled />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyForm.remarks" disabled />
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { getRoles, getCompanyInfo, deleteRole } from '@/api/role'
import { mapGetters } from 'vuex'
import roleDialog from '@/views/settings/components/roleDialog'
import rightsDialog from '@/views/settings/components/rightsDialog'
export default {
  components: {
    roleDialog,
    rightsDialog
  },
  data() {
    return {
      activeName: 'role',
      total: 0,
      tableData: [],
      currentPage: 1,
      companyForm: {
        name: '',
        companyAddress: '',
        companyPhone: '',
        mailbox: '',
        remarks: ''
      },
      /* 编辑和添加对话框 */
      dialogVisible: false,
      /* 权限对话框 */
      showRights: false
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const result = await getRoles()
      this.total = result.total
      this.tableData = result.rows
    },
    /* 切换tab触发 */
    async handleClick() {
      /* 如果公司id不存在：还未获取数据，或着和vuex中的id不一致，代表用户发生更换，需重新获取信息 */
      if (!this.companyForm.id || this.companyForm.id !== this.companyId) {
        this.companyForm = await getCompanyInfo(this.companyId)
      }
    },
    /* 添加角色 */
    handleAdd() {
      this.dialogVisible = true
    },
    async handleAssign(id) {
      await this.$refs.rightsDialogRef.getRights(id)
      this.showRights = true
    },
    async handleEdit(id) {
      /* 父组件调用子组件方法，并直接传参 */
      await this.$refs.roleDialogRef.getRoleInfoById(id)
      this.dialogVisible = true
    },
    handleDelete(id) {
      this.$confirm('确定删除该角色吗', '请确认').then(async() => {
        await deleteRole(id)
        this.$message.success('角色删除成功')
        /* 重新获取数据 */
        this.initData()
      })
        .catch(() => {
          this.$message.info('取消删除')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.role_wrapper {
  margin-top: 20px;
  padding: 20px;
  a {
    margin: 0 10px;
    color: #409eff;
    &:hover {
      cursor: pointer;
    }
  }
  .role_pagination {
    display: flex !important;
    justify-content: flex-end;
  }
}
.company_info {
  margin-top: 20px;
  margin-left: 50px;
  width: 500px;
}
</style>
