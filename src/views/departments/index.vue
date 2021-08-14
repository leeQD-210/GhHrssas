<template>
  <div class="departments-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="公司架构" name="first">
          <div class="departments_wrapper">
            <!-- 头部 -->
            <div class="departments-title">
              <treeTable :tree-data="titleData" :if-root="true" :icon-class="'tree-table'" @addDept="handleAdd" />
            </div>
            <!-- 主体内容 -->
            <div class="departments-content">
              <el-tree v-loading="loading" :data="departments" :props="defaultProps" :default-expand-all="true" style="color: #000;">
                <template v-slot="{ data }">
                  <treeTable :tree-data="data" :if-root="false" :icon-class="'people'" @deleteDept="initDate" @addDept="handleAdd" @editDept="handleEdit" />
                </template>
              </el-tree>
              <add-deptDialog ref="deptDialog" :dialog-visible.sync="dialogVisible" :tree-data="treeData" @refreshTable="initDate" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
/* 获取部门数据接口 */
import { getDepartments } from '@/api/departments'
/* 添加部门接口 */
// import { addDepartment } from '@/api/department'
/* 数组扁平化处理函数 */
import { tranListToTreeData } from '@/utils/index'
/* 树形组件 */
import treeTable from '@/views/departments/components/Treetable'
/* 部门操作对话框 */
import addDeptDialog from '@/views/departments/components/addDeptDialog'
export default {
  components: {
    treeTable,
    addDeptDialog
  },
  data() {
    return {
      activeName: 'first',
      departments: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      titleData: {},
      /* 当前操作行数据 */
      treeData: {},
      dialogVisible: false,
      loading: false
    }
  },
  created() {
    this.initDate()
  },
  methods: {
    async initDate() {
      this.loading = true
      const result = await getDepartments()
      /* 将扁平化的数据转化为树形结构 */
      this.departments = tranListToTreeData(result.depts, '')
      this.titleData = {
        name: '上海港湾基础建设（集团）股份有限公司',
        id: '' // 表示根节点
      }
      this.loading = false
    },
    handleAdd(data) {
      this.dialogVisible = true
      this.treeData = data
    },
    handleEdit(data) {
      /* 传递props */
      this.treeData = data
      /* 这里因为props传值是异步情况，当调用子组件方法是可能传值还没完成,所以传入父组件中的参数调用接口获取数据 */
      this.$refs.deptDialog.getDeptDetails(data.id).then(() => {
        /* 显示对话框 */
        this.dialogVisible = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.departments_wrapper {
  margin-top: 30px;
  padding: 0 50px;
  font-size: 12px;
  .departments-content {
    margin-top: 10px;
    padding: 5px;
    border-top: 1px solid #ccc;
  }
}
</style>
