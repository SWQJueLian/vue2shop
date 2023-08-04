<template>
  <div>
    <van-nav-bar :safe-area-inset-top="true" left-arrow :border="false"
                 @click-left="$router.go(-1)"
    >
      <template #title>
        <van-search
          :clearable="false"
          :autofocus="true"
          v-model="search_key"
          shape="round"
          placeholder="请输入搜索关键词">
          <template #right-icon>
            <van-icon @click="$toast('打开相机...')" name="paid" size="20"/>
          </template>
        </van-search>
      </template>
      <template #right>
        <van-icon class="tool" name="apps-o" size="25" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="综合推荐👏"></van-tab>
      <van-tab title="销量📈"></van-tab>
      <van-tab title="价格💰"></van-tab>
    </van-tabs>
    <div class="goods-list">
      <GoodsItem v-for="item in 10" :key="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'

export default {
  name: 'SearchListPage',
  components: { GoodsItem },
  data () {
    return {
      search_key: this.$route.query.searchkey
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .van-nav-bar__title {
  max-width: 100%;
}
// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
