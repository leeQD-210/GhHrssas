<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :limit="1"
      :on-change="handleChange"
      :class="{upload_container:fileList.length===1}"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-progress v-if="showProgress" :text-inside="true" :stroke-width="26" :percentage="currentPercent" />
    <el-dialog :visible.sync="dialogVisible" title="图片预览">
      <img style="width:100%;height:auto" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import Cos from 'cos-js-sdk-v5'
export default {
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      fileList: [],
      currentFileId: '',
      currentPercent: 0,
      showProgress: false
    }
  },
  methods: {
    /* 显示预览对话框 */
    handlePictureCardPreview(file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    handleChange(file, fileList) {
      /* change事件会触发两次，添加文件触发一次，上传文件触发一次 */
      this.fileList = fileList.map(item => item)
    },
    /* 删除图片 */
    handleRemove(file, fileList) {
      /* fileList表示删除操作后的数组 */
      this.fileList = fileList.map(item => item)
    },
    /* 上传前判断 */
    beforeUpload(file) {
      /* 判断文件上传类型 */
      const fileType = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!fileType.includes(file.type)) {
        this.$message.error('请上传jpeg、gif、bmp、png格式的图片')
        return false
      }
      /* 设置上传文件大小 */
      const maxSize = 5 * 1024 * 1024 // 单位是b
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过5M')
        return false
      }
      /* 记录当前上传文件的id */
      this.currentFileId = file.uid
      /* 打开进度条显示 */
      this.showProgress = true
      return true
    },
    /* 上传 */
    upload(params) {
      const cos = new Cos({
        SecretId: 'AKID72h4A0Zqqa4IFxOZS4PUJr9AuNaXMuBG',
        SecretKey: 'pOgiTw84j7E6i49yXooWyA6lAI8hz1mG'
      })
      if (params.file) {
        cos.putObject({
          Bucket: 'hrass-1306882536', /* 必须 */
          Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 */
          Key: params.file.name, /* 必须 */
          StorageClass: 'STANDARD',
          Body: params.file, // 上传文件对象
          onProgress: (progressData) => {
            /* 上传过程对象 */
            this.currentPercent = progressData.percent * 100
          }
        }, (err, data) => {
          console.log(err || data)
          /* 上传成功情况下 */
          if (!err && data.statusCode === 200) {
            /* 将fileList中的url地址替换为上传成功后的服务器地址 */
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileId) {
                /* 增加upload为true属性，用于后续提交判断 */
                return { url: 'https://' + data.Location, upload: true }
              }
              return item
            })
            setTimeout(() => {
              this.showProgress = false
            }, 1000)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
	.upload_container{
		.el-upload--picture-card{
			display: none;
		}
	}
</style>
