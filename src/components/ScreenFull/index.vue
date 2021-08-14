<template>
  <div class="screenfull">
    <!-- 放置一个svg的图标 -->
    <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px" @click="changeScreen" />
  </div>
</template>
<script>
import ScreenFull from 'screenfull'
export default {
  methods: {
    changeScreen() {
      /* 如果全屏插件不可用 */
      if (!ScreenFull.isEnabled) {
        this.$message.error('无法全屏')
        return
      }
      ScreenFull.toggle()
    }
  }
}
</script>
<style lang="scss" scoped>
.screenfull{
	&:hover{
		cursor: pointer;
	}
}
</style>
