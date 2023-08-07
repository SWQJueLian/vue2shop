<template>
  <div style="text-align: start;">
    <!--二级路由入口-->
    <router-view/>
    <van-tabbar placeholder v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" name="search" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" name="friends" icon="shopping-cart-o" :badge="cartLength">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" name="setting" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LayoutPage',
  data () {
    return {
      active: ''
    }
  },
  computed: {
    ...mapGetters('cart', ['cartLength'])
  },
  methods: {
    ...mapActions('cart', ['getCartList'])
  },
  created () {
    // 如果登录了才获取购物车列表
    if (this.$store.state.user.userinfo.token) {
      this.$store.dispatch('cart/getCartList')
    }
  }
}
</script>

<style scoped>

</style>
