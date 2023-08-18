/**
 * 在vue中使用mixins: [xxxx] 来使用。
 */

export default {
  methods: {
    showNeedLoginDialog () {
      if (this.$store.state.user.userinfo.token === '') {
        // 弹出是否去往登录页面弹窗
        this.$dialog.confirm({
          theme: 'round-button',
          title: '♥温馨提示',
          message: '该操作需要登录',
          cancelButtonText: '再逛逛',
          confirmButtonText: '去登录'
        })
          .then(() => {
            // 将当前的路由url通过back参数传递给/login，方便login页面跳回该页面
            this.$router.replace(`/login?back=${this.$route.fullPath}`)
          })
          .catch(() => {
            // on cancel
          })
        return true
      }
      return false
    }
  }
}
