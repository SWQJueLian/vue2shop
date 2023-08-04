<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
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
          autofocus
          v-model="search_key"
          shape="round"
          placeholder="请输入搜索关键词">
          <template #right-icon>
            <div class="btn-search" @click="onSearch">搜索</div>
          </template>
        </van-search>
      </van-sticky>

      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="@/assets/banner1.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/banner2.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/banner3.jpg" alt="">
        </van-swipe-item>
      </van-swipe>
      <!--导航-->
      <van-grid square column-num="5" icon-size="40" :border="false">
        <van-grid-item
          v-for="item in 10" :key="item"
          icon="http://cba.itlike.com/public/uploads/10001/20230320/58a7c1f62df4cb1eb47fe83ff0e566e6.png"
          text="新品首发"
          @click="$router.push('/category')"
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
          <GoodsItem v-for="item in 10" :key="item"></GoodsItem>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'

export default {
  name: 'HomePage',
  components: { GoodsItem },
  data () {
    return {
      search_key: '',
      isLoading: ''
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
.btn-search {
  padding: 0px 15px 0px 15px;
  background: linear-gradient(to right, orange, orangered);
  border-radius: 16px;
  color: white;
  cursor: pointer;
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

.wocao {
  display: inline;
}
</style>
