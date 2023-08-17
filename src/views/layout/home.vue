<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :head-height="80" style="min-height: 100vh;">
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <img
          class="doge"
          src="https://img01.yzcdn.cn/vant/doge.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
      </template>
      <!-- 释放提示 -->
      <template #loosing>
        <img class="doge" src="https://img01.yzcdn.cn/vant/doge.png"/>
      </template>
      <!-- 加载提示 -->
      <template #loading>
        <img class="doge" src="https://img01.yzcdn.cn/vant/doge-fire.jpg"/>
      </template>
      <!--顶部-->
      <van-sticky>
        <van-nav-bar
          :border=false
          @click-left="$router.push('/user')"
          @click-right="$toast('聊天页面...')">
          <template #left>
            <van-image fit="cover" round width="32px" height="32px" src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
          </template>
          <template #title>
            <van-tabs @click="onTabClick" line-width="30px">
              <van-tab to="/home" title="首页"></van-tab>
              <van-tab to="/home" title="推荐"></van-tab>
            </van-tabs>
          </template>
          <template #right>
            <!-- 聊天页面 -->
            <van-icon color="#333" name="chat-o" size="25" badge="9"/>
          </template>
        </van-nav-bar>
        <van-search
          @focus="$router.push('/search')"
          v-model="search_key"
          shape="round"
          placeholder="请输入搜索关键词">
          <template #right-icon>
            <div class="mybtn-search" @click="$router.push('/search')">搜索</div>
          </template>
        </van-search>
      </van-sticky>
      <!-- code by me..-->
      <van-notice-bar
        color="#1989fa"
        background="#ecf9ff"
        left-icon="volume-o"
        text="Coding By 宋炜权， 下拉可刷新首页数据！"
      />
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
  activated () {
    console.log('HomePage activated')
  },
  deactivated () {
    console.log('HomePage deactivated')
  },
  async created () {
    console.log('homepage created...')
    await this.initDataList()
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
    async initDataList () {
      const { data: { pageData } } = await getHomeData()
      // console.log(pageData)
      this.bannerImgList = pageData.items[1].data
      this.gridList = pageData.items[3].data
      this.productList = pageData.items[6].data
    },
    onTabClick (name, title) {
      this.$toast(`切换到${title}`)
      // console.log(name, title)
    },
    async onRefresh () {
      await this.initDataList()
      await this.$toast('刷新成功')
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}

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
