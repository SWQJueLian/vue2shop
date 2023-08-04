<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="min-height: 100vh;">
      <!--顶部-->
      <van-sticky>
        <van-nav-bar
          :border=false
          @click-left="$router.push('/user')"
          @click-right="$router.push('/my_message')">
          <template #left>
            <van-image round width="30px" height="30px" src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
          </template>
          <template #title>
            <van-tabs @click="onTabClick" line-width="30px">
              <van-tab to="/home" title="首页"></van-tab>
              <van-tab to="/home" title="推荐"></van-tab>
            </van-tabs>
          </template>
          <template #right>
            <van-icon color="#333" name="chat-o" size="25" badge="9"/>
          </template>
        </van-nav-bar>
        <van-search
          @focus="$router.push('/search')"
          autofocus
          v-model="search_key"
          shape="round"
          placeholder="请输入搜索关键词">
          <template #right-icon>
            <div class="mybtn-search" @click="$router.push('/search')">搜索</div>
          </template>
        </van-search>
      </van-sticky>

      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerImgList" :key="item.imgUrl">
          <img :src="item.imgUrl" alt="">
        </van-swipe-item>
      </van-swipe>
      <!--导航-->
      <van-grid square column-num="5" icon-size="40" :border="false">
        <van-grid-item
          v-for="item in gridList" :key="item.imgUrl"
          :icon="item.imgUrl"
          :text="item.text"
          @click="$router.push(`/category`)"
        />
      </van-grid>

      <!-- 主会场 -->
      <div class="main">
        <img src="@/assets/main.png" alt="">
      </div>

      <!-- 猜你喜欢 -->
      <div class="guess">
        <p class="guess-title">—— 猜你喜欢 ——</p>

        <div class="goods-list">
          <GoodsItem :goods="item" v-for="item in productList" :key="item.goods_id"></GoodsItem>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/apis/home'

export default {
  name: 'HomePage',
  components: { GoodsItem },
  async created () {
    const { data: { pageData } } = await getHomeData()
    console.log(pageData)
    this.bannerImgList = pageData.items[1].data
    this.gridList = pageData.items[3].data
    this.productList = pageData.items[6].data
  },
  data () {
    return {
      search_key: '',
      isLoading: false,
      bannerImgList: [],
      gridList: [],
      productList: []
    }
  },
  methods: {
    onSearch () {
    },
    onTabClick (name, title) {
      console.log(name, title)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
::v-deep .van-tab--active {
  font-size: 16px !important;
  font-weight: bold !important;
}
.my-swipe .van-swipe-item {
  height: 165px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}

.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}

// 主会场
.main img {
  display: block;
  width: 100%;
}

.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
