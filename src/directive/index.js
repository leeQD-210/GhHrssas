export const imagerror = {
  /* 当dom元素被插入时执行inserted钩子函数 */
  inserted: function(dom, options) {
    /* img在没有地址的时候不会触发error事件*/
    if (dom.src.trim() === '') {
      dom.src = options.value
    }
    /* img在有地址但是加载失败时会触发error事件 */
    dom.onerror = function() {
      dom.src = options.value
    }
  },
  /* 组件更新时调用 */
  componentUpdated: function(dom, options) {
    /* img在没有地址的时候不会触发error事件*/
    if (dom.src.trim() === '') {
      dom.src = options.value
    }
  }
}
