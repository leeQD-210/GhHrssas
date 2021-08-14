<template>
  <div>
    <page-tools :show-before="true">
      <template v-slot:before>
        <div>共{{ total }}条信息</div>
      </template>
      <template v-slot:after>
        <div>
          <el-button type="warning" @click="$router.push('/import')">导入excel</el-button>
          <el-button type="danger" @click="reportData">导出excel</el-button>
          <el-button type="primary" @click="handleAdd">+ 新增员工</el-button>
        </div>
      </template>
    </page-tools>
    <el-card class="table_container">
      <el-table :data="tableData" style="width: 100%" center border>
        <el-table-column label="序号" type="index" :index="handleIndex" />
        <el-table-column prop="username" label="姓名" sortable />
        <el-table-column label="头像" width="100px">
          <template v-slot="{row}">
            <div>
              <el-row type="flex" justify="center" align="center">
                <img v-imagerror="require('@/assets/common/1.jpg')" :src="row.staffPhoto" class="user_avatar" @click="showQrCode(row.staffPhoto)" />
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" sortable />
        <el-table-column prop="workNumber" label="工号" sortable />
        <el-table-column :formatter="formatEplyForm" prop="formOfEmployment" label="聘用形势" sortable />
        <el-table-column prop="departmentName" label="部门" sortable />
        <el-table-column label="入职时间" sortable>
          <template v-slot="{ row }">
            <div>
              {{ row.timeOfEntry | dateFormat }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatServStatus" prop="inServiceStatus" label="是否在职" sortable />
        <el-table-column prop="enableState" label="状态" sortable>
          <template v-slot="{ row }">
            <el-switch :value="row.enableState === 1" active-color="#FFB6C1" inactive-color="#ff4949" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="{ row }">
            <a href="#" @click.prevent="$router.push(`/details/${row.id}`)">查看</a>
            <a href="#" @click.prevent="changeSatus(row.id)">转正</a>
            <a href="#" @click.prevent="changeWork(row.id)">调岗</a>
            <a href="#" @click.prevent="dismission(row.id)">离职</a>
            <a href="#" @click.prevent="assignRole(row.id)">分配角色</a>
            <a href="#" @click.prevent="handleDelete(row.id)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top:5px">
        <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total" @current-change="handlePageChange" />
      </el-row>
    </el-card>
    <employee-dialog :show-dialog.sync="showDialog" @refresh="initData(1, 5)" />
    <assign-role ref="assignRoleRef" :show-assign-role.sync="showAssignRole" />
    <to-qrcode ref="qrCodeRef" :open-qr-code.sync="openQrCode" />
  </div>
</template>
<script>
import { getEmployeeInfo, deleteEmployee } from '@/api/employees'
/* 员工枚举数据 */
import employeeEnum from '@/api/constant/employees'
/* 员工添加对话框 */
import employeeDialog from '@/views/employees/components/employeeDialog'
import assignRole from '@/views/employees/components/assignRole'
import { dateFormat } from '@/filters'
export default {
  components: {
    employeeDialog,
    assignRole
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      /* 新增员工对话框 */
      showDialog: false,
      /* 二维码对话框 */
      openQrCode: false,
      /* 分配角色对话框 */
      showAssignRole: false
    }
  },
  created() {
    this.initData(this.currentPage, this.pageSize)
  },
  methods: {
    async initData(page, size) {
      const { total, rows } = await getEmployeeInfo(page, size)
      this.total = total
      this.tableData = rows
    },
    changeStatus() {},
    changeWork() {},
    dismission() {},
    /* 分配角色 */
    async assignRole(id) {
      /* 执行子组件的异步操作，传入id */
      await this.$refs.assignRoleRef.getUserInfo(id)
      /* 数据获取完成后打开对话框 */
      this.showAssignRole = true
    },
    handleAdd() {
      this.showDialog = true
    },
    handleDelete(id) {
      this.$confirm('确定删除该员工信息吗？', '请确认')
        .then(async() => {
          await deleteEmployee(id)
          this.$message.success('删除员工信息成功')
          this.initData(this.currentPage, this.pageSize)
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    },
    /* 页面跳转 */
    handlePageChange() {
      this.initData(this.currentPage, this.pageSize)
    },
    /* 处理序号 */
    handleIndex(index) {
      return index + 1 + this.pageSize * (this.currentPage - 1)
    },
    /* 处理聘用状态格式 */
    formatEplyForm(row, column, cellValue, index) {
      /* find方法如找到会返回该元素 */
      const result = employeeEnum.hireType.find(item => item.id === cellValue)
      return result ? result.value : '非正式'
    },
    /* 格式化在职状态 */
    formatServStatus(row, column, cellValue, index) {
      /* find方法如找到会返回该元素 */
      const result = employeeEnum.workingState.find(item => ~~item.id === cellValue)
      return result ? result.value : '未知'
    },
    /* 导出数据函数 */
    async reportData() {
      const header = {
        '姓名': 'username',
        '工号': 'workNumber',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '转正日期': 'correctionTime',
        '聘用形式': 'formOfEmployment',
        '部门': 'departmentName'
      }
      const { rows } = await getEmployeeInfo(1, this.total)
      const data = this.formatData(rows, header)
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          /* 多重表头 */
          multiHeader: [['姓名', '主要信息', '', '', '', '', '部门']],
          /* 指定合并的单元格 */
          merges: ['A1:A2', 'B1:F1', 'G1:G2'],
          header: Object.keys(header), // 表头 必填[]
          data, // 具体数据 必填[[]] [{}]
          filename: '员工信息表', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 文件格式，非必填
        })
      })
    },
    /* 数据结构转化函数 */
    formatData(data, header) {
      return data.map(item => {
        return Object.keys(header).map(obj => {
          /* 处理时间格式数据 */
          if (header[obj] === 'timeOfEntry' || header[obj] === 'correctionTime') {
            return dateFormat(item[header[obj]])
          } else if (header[obj] === 'formOfEmployment') {
            const result = employeeEnum.hireType.find(object => object.id === item[header[obj]])
            return result ? result.value : '未知'
          }
          return item[header[obj]]
        })
      })
    },
    /* 显示二维码 */
    showQrCode(url) {
      if (url) {
        this.openQrCode = true
        this.$refs.qrCodeRef.handleCanvas(url)
      } else {
        this.$message.error('显示内容为空')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.table_container {
  padding: 0;
  .user_avatar{
    width:50px;
    height: 50px;
    border-radius: 50%;
    &:hover{
      cursor: pointer;
    }
  }
  a {
    margin: 0 5px;
    color: #409eff;
  }
}
</style>
