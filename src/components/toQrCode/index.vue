<template>
  <div>
    <el-dialog :visible.sync="openQrCode" title="扫描二维码下载" width="300px" @close="handleClose">
      <el-row type="flex" justify="center" align="center">
        <canvas ref="myCanvas"></canvas>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import QrCode from 'qrcode'
export default {
  props: {
    openQrCode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCanvas(url) {
      this.$nextTick(() => {
        QrCode.toCanvas(this.$refs.myCanvas, url)
      })
    },
    handleClose() {
      this.$emit('update:openQrCode', false)
    }
  }
}
</script>
