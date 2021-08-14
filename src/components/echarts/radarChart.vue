<template>
  <div id="main" ref="chartMain">

  </div>
</template>
<script>
import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { TitleComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([RadarChart, TitleComponent, LegendComponent, CanvasRenderer])
export default {
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  /* 应为要获取dom,所以需要等组件挂载完成后初始化图表 */
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const myChart = echarts.init(this.$refs.chartMain)
      this.option && myChart.setOption(this.option)
    }
  }
}
</script>
<style lang="scss" scoped>
#main{
	width:auto;
	height: 500px;
}
</style>
