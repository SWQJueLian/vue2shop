<template>
  <div>
    <!--二级路由入口-->
    <router-view/>
    <router-link to="/home">主页</router-link>
    <router-link to="/category">分页</router-link>
    <router-link to="/cart">购物车</router-link>
    <router-link to="/user">我的</router-link>
  </div>
</template>

<script>
export default {
  name: 'LayoutPage'
}
</script>

<style scoped>

</style>
