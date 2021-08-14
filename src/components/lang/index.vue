<template>
  <div>
    <el-dropdown trigger="click" @command="changeLanguage">
      <div>
        <svg-icon style="color:#fff;font-size:20px" icon-class="language" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh" :disabled="$i18n.locale==='zh'">中文</el-dropdown-item>
        <el-dropdown-item command="en" :disabled="$i18n.locale==='en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import Cookie from 'js-cookie'
export default {
  methods: {
    changeLanguage(val) {
      /* 在cookie中存入选中的语言 */
      Cookie.set('language', val)
      /* 给i18n插件设置显示语言 */
      this.$i18n.locale = val
      val === 'zh' ? this.$message.success('切换语言成功') : this.$message.success('change language successful')
    }
  }
}
</script>
