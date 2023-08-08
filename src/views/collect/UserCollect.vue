<template>
  <div class="user-collect">
    <!-- 顶部导航条 -->
    <van-nav-bar
      title="我的收藏(100)"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon @click="$toast('搜索收藏')" name="search" size="20" />
        <p style="margin-left: 10px">编辑</p>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" sticky>
      <van-tab title="默认">
        <van-swipe-cell v-for="index in 8" :key="index">
          <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            class="goods-card"
            thumb="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </van-tab>
      <van-tab title="图文">内容 2</van-tab>
      <van-tab title="视频">内容 3</van-tab>
      <van-tab title="话题">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'UserCollect',
  active: ''
}
</script>

<style lang="less" scoped>
.user-collect {
  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
}
</style>
