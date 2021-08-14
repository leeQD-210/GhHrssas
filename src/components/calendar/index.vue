<template>
  <el-card class="calendar_wrap">
    <span class="title">工作日历</span>
    <div class="padding:0 10px">
      <el-row type="flex" justify="end">
        <el-select v-model="currentYear" placeholder="请选择年" class="select_date" @change="handleYear">
          <el-option v-for="item in Array.from(Array(21), (key, index) => (key = index + 2010))" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="currentMonth" placeholder="请选择月" class="select_date" @change="handleMonth">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
        </el-select>
      </el-row>
      <el-calendar v-model="currentDate" class="el-calendar">
        <template v-slot:dateCell="{ date, data }">
          <span>{{ data.day.split('-')[2].startsWith('0') ? data.day.split('-')[2].substr(1) : data.day.split('-')[2] }}</span>
          <span v-if="data.type === 'current-month' && (new Date(date).getDay() === 6 || new Date(date).getDay() === 0)" class="icon_rest">{{ '休' }}</span>
        </template>
      </el-calendar>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      currentYear: 2021,
      currentMonth: 8,
      currentDate: ''
    }
  },
  methods: {
    getDateNow() {
      this.currentDate = new Date()
      this.currentYear = new Date().getFullYear()
      this.currentMonth = new Date().getMonth + 1
    },
    handleYear() {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
    },
    handleMonth(month) {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
    }
  }
}
</script>
<style lang="scss" scoped>
    .calendar_wrap {
      .select_date {
        width: 100px;
        margin: 0 5px;
        margin-top: 20px;
      }
      .el-calendar {
        ::v-deep .el-calendar__header {
          display: none;
        }
        ::v-deep .el-calendar__body {
          font-size: 15px;
          thead {
            th {
              padding: 0;
              height: 30px;
              font-weight: 1000;
              &:nth-child(n + 6) {
                color: red;
              }
            }
          }
          tbody {
            td {
              text-align: center;
              border: none;
              .el-calendar-day {
                height: 50px;
              }
            }
          }
        }
        .icon_rest {
          display: inline-block;
          position: relative;
          top:-1px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #fa7c4d;
          line-height: 20px;
          color:#fff;
          font-size: 12px;
          margin-left:5px;
        }
      }
    }
    .title {
      padding-bottom: 10px;
      border-bottom: 5px solid #8a97f8;
    }
</style>
