<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <!-- 开头，用户信息 -->
      <el-card class="user_info">
        <el-row type="flex" justify="start">
          <el-col :span="2">
            <img v-imagerror="require('@/assets/common/1.jpg')" :src="avatar" class="avatar" />
          </el-col>
          <el-col :span="8">
            <el-row>
              <span>你好, {{ username }}! 祝你开心每一天!</span>
            </el-row>
            <el-row>
              <span>
                <span style="font-size:18px">{{ username }} | 上海港湾</span>
              </span>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <el-row>
        <el-col :span="13">
          <!-- 日历组件 -->
          <Calendar />
          <!-- 公告区域 -->
          <el-card class="notice_container">
            <span class="title">公告</span>
            <div class="notice_wrap">
              <div class="bottomline">
                <el-row class="notice_context">
                  <el-col :span="2">
                    <img v-imagerror="require('@/assets/common/1.jpg')" :src="avatar" alt="" class="avatar" />
                  </el-col>
                  <el-col :span="10">
                    <el-row style="height:25px;line-height:25px">
                      <span style="color:red">{{ username }}</span>发布了评论：怎么还不放假啊！！！
                    </el-row>
                    <el-row style="height:25px;line-height:25px">
                      2021-08-07 15：30：25
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div class="bottomline">
                <el-row class="notice_context">
                  <el-col :span="2">
                    <img v-imagerror="require('@/assets/common/1.jpg')" :src="avatar" alt="" class="avatar" />
                  </el-col>
                  <el-col :span="10">
                    <el-row style="height:25px;line-height:25px">
                      <span style="color:red">{{ username }}</span>发布了评论：怎么还不放假啊！！！
                    </el-row>
                    <el-row style="height:25px;line-height:25px">
                      2021-08-07 15：30：25
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div class="bottomline">
                <el-row class="notice_context">
                  <el-col :span="2">
                    <img v-imagerror="require('@/assets/common/1.jpg')" :src="avatar" alt="" class="avatar" />
                  </el-col>
                  <el-col :span="10">
                    <el-row style="height:25px;line-height:25px">
                      <span style="color:red">{{ username }}</span>发布了评论：怎么还不放假啊！！！
                    </el-row>
                    <el-row style="height:25px;line-height:25px">
                      2021-08-07 15：30：25
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div class="bottomline">
                <el-row class="notice_context">
                  <el-col :span="2">
                    <img v-imagerror="require('@/assets/common/1.jpg')" :src="avatar" alt="" class="avatar" />
                  </el-col>
                  <el-col :span="10">
                    <el-row style="height:25px;line-height:25px">
                      <span style="color:red">{{ username }}</span>发布了评论：怎么还不放假啊！！！
                    </el-row>
                    <el-row style="height:25px;line-height:25px">
                      2021-08-07 15：30：25
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div class="bottomline">
                <el-row class="notice_context">
                  <el-col :span="2">
                    <img v-imagerror="require('@/assets/common/1.jpg')" :src="avatar" alt="" class="avatar" />
                  </el-col>
                  <el-col :span="10">
                    <el-row style="height:25px;line-height:25px">
                      <span style="color:red">{{ username }}</span>发布了评论：怎么还不放假啊！！！
                    </el-row>
                    <el-row style="height:25px;line-height:25px">
                      2021-08-07 15：30：25
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div class="bottomline">
                <el-row class="notice_context">
                  <el-col :span="2">
                    <img v-imagerror="require('@/assets/common/1.jpg')" :src="avatar" alt="" class="avatar" />
                  </el-col>
                  <el-col :span="10">
                    <el-row style="height:25px;line-height:25px">
                      <span style="color:red">{{ username }}</span>发布了评论：怎么还不放假啊！！！
                    </el-row>
                    <el-row style="height:25px;line-height:25px">
                      2021-08-07 15：30：25
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="11">
          <!-- 申请流程 -->
          <el-card class="application_process">
            <div>
              <span class="title">流程申请</span>
            </div>
            <el-row type="flex" justify="space-between" style="margin:20px">
              <el-button round @click="openOtDialog">加班离职</el-button>
              <el-button round> 请假调休</el-button>
              <el-button round @click="$router.push('/users/approvals')">审批列表</el-button>
              <el-button round @click="$router.push('/users/info')">我的信息</el-button>
            </el-row>
          </el-card>
          <component :is="'otOrDepartDialog'" :show-dialog.sync="showDialog" />
          <!-- 快速开始 -->
          <el-card class="quick_start">
            <div>
              <span class="title">快速开始/便捷导航</span>
            </div>
            <el-row type="flex" justify="space-between" style="margin:20px">
              <el-button round>人事月报</el-button>
              <el-button round>考勤查询</el-button>
              <el-button round>考勤统计</el-button>
              <el-button round>员工审核</el-button>
              <el-button round>组织架构</el-button>
            </el-row>
          </el-card>
          <!-- 绩效数据 -->
          <el-card class="performance_statistics">
            <component :is="'RadarChart'" :option="perOption" />
          </el-card>
          <!-- 帮助中心 -->
          <el-card class="help">
            <div>
              <span class="title">帮助连接</span>
              <el-row type="flex">
                <div class="icon_wrap">
                  <div class="icon icon_guide"></div>
                  <span style="font-size:18px">入门指南</span>
                </div>
                <div class="icon_wrap">
                  <div class="icon icon_help"></div>
                  <span style="font-size:18px">在线帮助手册</span>
                </div>
                <div class="icon_wrap">
                  <div class="icon icon_call"></div>
                  <span style="font-size:18px">联系技术支持</span>
                </div>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Calendar from '@/components/calendar'
import RadarChart from '@/components/echarts/radarChart.vue'
import otOrDepartDialog from '@/views/dashboard/components/otOrDepartDialog.vue'
export default {
  name: 'Dashboard',
  components: {
    /* 日历组件 */
    Calendar,
    /* 雷达图组件 */
    RadarChart,
    /* 申请弹窗组件 */
    otOrDepartDialog
  },
  data() {
    return {
      /* 个人绩效数据 */
      perOption: {
        title: {
          text: '绩效数据'
        },
        legend: {
          data: ['张三', '李四']
        },
        radar: {
        // shape: 'circle',
          indicator: [
            { name: '工作效率', max: 100 },
            { name: '绩效', max: 100 },
            { name: '考勤', max: 100 },
            { name: '学习能力', max: 100 },
            { name: '研发能力', max: 100 },
            { name: '管理能力', max: 100 }
          ]
        },
        series: [{
          name: '张三vs李四',
          type: 'radar',
          data: [
            {
              value: [67, 78, 65, 74, 90, 52],
              name: '张三'
            },
            {
              value: [88, 79, 65, 76, 68, 90],
              name: '李四'
            }
          ]
        }]
      },
      /* 申请弹窗 */
      showDialog: false
    }
  },
  computed: {
    ...mapGetters(['username', 'avatar'])
  },
  methods: {
    openOtDialog() {
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-text {
    font-size: 25px;
    line-height: 50px;
    color: #ccc;
    .bottomline {
      border-bottom: 1px solid #ccc;
    }
    .user_info {
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .notice_wrap {
      width: 100%;
      max-height: 500px;
      padding: 10px 20px;
      overflow: auto;
      .notice_context {
        padding: 10px 0;
        height: 70px;
        font-size: 15px;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
    .title {
      padding-bottom: 10px;
      border-bottom: 5px solid #8a97f8;
    }
    .help {
      .icon_wrap {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        height: 150px;
      }
      .icon {
        width: 76px;
        height: 76px;
        border-radius: 50%;
        background: url('~@/assets/common/icon.png') no-repeat;
      }
      .icon_guide {
        background-position: 3px 0;
      }
      .icon_help {
        background-position: -218px 0;
      }
      .icon_call {
        background-position: -460px 0;
      }
    }
  }
}
</style>
