<template>
  <div style="text-align: start;">
    <!--二级路由入口-->
    <router-view/>
    <van-tabbar route placeholder v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" name="category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" name="cart" icon="shopping-cart-o" :badge="cartLength">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" name="user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getActiveBar, setAcitveBar } from '@/utils/stroage'

export default {
  name: 'LayoutPage',
  data () {
    return {
      active: getActiveBar()// 默认高亮首页
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
  },
  watch: {
    active: {
      handler (newValue) {
        setAcitveBar(newValue)
      }
    }
  }
}
</script>

<style scoped>

</style>
