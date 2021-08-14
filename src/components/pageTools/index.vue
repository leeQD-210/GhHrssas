<template>
  <div>
    <el-card class="pageTools_container">
      <div class="title_wrapper">
        <div v-if="showBefore" class="before">
          <i class="el-icon-info"></i>
          <slot name="before"></slot>
        </div>
        <div class="after">
          <slot name="after"></slot>
        </div>
      </div>
      <div class="content_wrapper">
        <slot name="content"></slot>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    showBefore: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.pageTools_container{
	padding: 0;
	.title_wrapper{
		display: flex;
		justify-content: space-between;
		.before{
		display: flex;
		padding:0 10px;
		height: 35px;
		align-items: center;
		border:1px solid #91d5ff;
		border-radius: 5px;
		background-color: #e6f7ff;
		.el-icon-info{
			margin-right: 5px;
			color:#409eff;
		}
	}
	.after{
		display: flex;
		justify-content: flex-end;
	}
	}

}
</style>
