<template>
  <div>
    <van-nav-bar fixed placeholder :safe-area-inset-top="true" left-arrow :border="false"
                 @click-left="$router.go(-1)"
    >
      <template #title>
        <!--
        @focus="$router.push('/search')" # 获取焦点的时候重新进入搜索页，京东和淘宝都是这样的...
        /home ->
            /search -> /search-list -> /search -> /search-list
        -->
        <van-search
          @focus="handleToRouter"
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
        <van-icon @click="$router.replace('/category')" class="tool" name="apps-o" size="22"/>
      </template>
    </van-nav-bar>
    <van-notice-bar
      mode="closeable"
      left-icon="volume-o"
      text="上拉自动加载更多数据！"
    />
    <van-list
      :immediate-check='false'
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-tabs v-model="active" @click="wrapperSortSearch" line-width="60">
        <van-tab name="all" title="👏综合推荐"></van-tab>
        <van-tab name="sales" title="📈销量"></van-tab>
        <van-tab name="price" :title="sort_price === -1 ? '💰价格⬇' : '💰价格⬆'"></van-tab>
      </van-tabs>
      <div class="goods-list">
        <GoodsItem v-for="(item) in search_result_list" :key="item.goods_id" :goods="item"></GoodsItem>
      </div>
    </van-list>
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
      firstPrice: true,
      loading: false, // 加载中...
      finished: false, // 是否已经全部数据都加载完了
      active: '', // 激活的tab标签
      current_page: 1, // 当前页数
      last_page: 2, // 最后一页
      search_key: this.$route.query.searchkey, // 搜索的关键字
      search_result_list: [], // 搜索结果
      sort_price: 0 // 用于价格排序时切换排序规则, 0 -> 低到高，-1 -> 高到低
    }
  },
  created () {
    // 首次就用默认的规则去搜索
    this.sortSearch()
    console.log('searchList', this.$router.getRoutes())
  },
  methods: {
    handleToRouter () {
      // console.log(this.$router.getRoutes())
      this.$router.replace('/search')
    },
    async getSearchKeyProductList (searchrules, loadmore) {
      const { data: { list } } = await getSearchKeyProductList(searchrules)
      if (searchrules.page > 1 && loadmore) {
        // 只有在大于第一页页数才将加载更多的数据追加到搜索列表上。
        this.search_result_list.push(...list.data)
      } else {
        this.search_result_list = list.data
      }
      this.current_page = list.current_page
      this.last_page = list.last_page
      // 将loading设置为false
      this.loading = false
      if (this.current_page === this.last_page) {
        this.finished = true
      }
    },
    // 上拉加载更多....
    onLoad () {
      console.log('Onload moredata...')
      if (this.current_page < this.last_page) {
        // 给他自增1，防止onLoad多次触发
        this.current_page += 1
        console.log(`请求第${this.last_page}页的数据`)
        this.sortSearch(this.active, this.last_page, true)
        // 这里放到请求方法getSearchKeyProductList中去更好。
        // this.loading = false
        // if (this.current_page === this.last_page) {
        //   this.finished = true
        // }
      }
    },
    // tab点击重新加载搜索列表
    wrapperSortSearch (name, title, page) {
      this.sortSearch(name, page)
      if (name === 'price' && this.firstPrice) {
        this.firstPrice = !this.firstPrice
        console.log('name为price，且this,firstPrice为true,设置fristPrice为：', this.firstPrice)
      }
      // 切到其他没有升序和倒序的tab标签就重置价格这个tab标签
      if (name !== 'price') {
        this.sort_price = 0
        this.firstPrice = true
      }
    },
    sortSearch (sortType, page, loadmore) {
      // 点击时将finished重置为true，因为切换tab排序标签时，不同排序都有可能有下一页。
      this.finished = false
      // 判断是否第一次选中price标签
      if (this.firstPrice) {
        console.log('firstPrice为', this.firstPrice, 'sort_price设置为0')
        this.sort_price = 0
      } else if (!loadmore) {
        // if (!loadmore) {
        this.sort_price = this.sort_price === 0 ? this.sort_price = -1 : this.sort_price = 0
        console.log('非loadmore，firstPrice为', this.firstPrice, `sort_price设置为${this.sort_price}`)
      }
      // 设置默认的搜索规则
      const searchrules = {
        goodsName: this.search_key,
        categoryId: this.$route.query.categoryId,
        page: page || 1,
        sortType: sortType || 'all',
        sortPrice: this.sort_price
      }
      this.getSearchKeyProductList(searchrules, loadmore)
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .van-nav-bar__title {
  max-width: 100%;
}

.van-search {
  padding: 0;
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
