<template>
  <div>
    <van-nav-bar :safe-area-inset-top="true" left-arrow :border="false"
                 @click-left="$router.go(-1)"
    >
      <template #title>
        <!--
        @focus="$router.push('/search')" # 获取焦点的时候重新进入搜索页，京东和淘宝都是这样的...
        -->
        <van-search
          @focus="$router.push('/search')"
          :clearable="false"
          v-model="search_key"
          shape="round"
          placeholder="请输入搜索关键词">
          <template #right-icon>
            <van-icon @click="$toast('打开相机...')" name="paid" size="20"/>
          </template>
        </van-search>
      </template>
      <template #right>
        <van-icon class="tool" name="apps-o" size="25"/>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" @click="sortSearch">
      <van-tab name="all" title="👏综合推荐"></van-tab>
      <van-tab name="sales" title="📈销量"></van-tab>
      <van-tab name="price" :title="sort_price === 0 ? '💰价格⬇' : '💰价格⬆'"></van-tab>
    </van-tabs>
    <div class="goods-list">
      <GoodsItem v-for="item in search_result_list" :key="item" :goods="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getSearchKeyProductList } from '@/apis/search'

export default {
  name: 'SearchListPage',
  components: { GoodsItem },
  data () {
    return {
      search_key: this.$route.query.searchkey,
      search_result_list: [],
      sort_price: 0 // 用于价格排序时切换排序规则
    }
  },
  created () {
    this.getSearchKeyProductList({
      goodsName: this.search_key,
      page: 1
    })
  },
  methods: {
    async getSearchKeyProductList (searchrules) {
      console.log(searchrules)
      const { data: { list } } = await getSearchKeyProductList(searchrules)
      // console.log(list)
      this.search_result_list = list.data
    },
    sortSearch (name, title) {
      console.log(name, title)
      this.getSearchKeyProductList({
        goodsName: this.search_key,
        page: 1, // 暂时写死只获取第一页
        sortType: name,
        sortPrice: this.sort_price
      })
      // 如果是按价格排序，每次点击就切换价格排序规则
      if (name === 'price') {
        this.sort_price === 0 ? this.sort_price = -1 : this.sort_price = 0
      }
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
