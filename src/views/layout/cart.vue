<template>
  <div class="cart">
    <van-pull-refresh style="min-height: 100vh;" v-model="isLoading" @refresh="onRefresh">
      <div style="padding: 10px">
        <!-- 顶部导航条-->
        <van-nav-bar title="购物车" fixed placeholder/>
        <!--商品SKU-->
        <van-swipe-cell v-for="index in 15" :key="index">
          <van-card
            origin-price="10.00"
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            class="goods-card"
            thumb="https://img01.yzcdn.cn/vant/cat.jpeg">
            <template #thumb>
              <div class="mythumb">
                <van-checkbox v-model="checked" icon-size="17" checked-color="#ee0a24"></van-checkbox>
                <van-image
                  style="margin-left: 8px"
                  width="100px"
                  height="100px"
                  fit="cover"
                  src="https://img01.yzcdn.cn/vant/cat.jpeg"
                />
              </div>
            </template>
            <template #num>
              <CountBox v-model="count"></CountBox>
            </template>
          </van-card>
          <!--自定义右滑动的内容-->
          <template #right>
            <van-button square type="primary" text="收藏" class="swipe-cell-btn"/>
            <van-button square text="删除" type="danger" class="swipe-cell-btn"/>
          </template>
        </van-swipe-cell>
      </div>
      <!--底部提交条-->
      <div ref="submit-bar-outside">
        <van-submit-bar ref="submit-bar" :price="3050" button-text="结算(5)" @submit="onSubmit">
          <van-checkbox v-model="checked">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'

export default {
  name: 'CartPage',
  components: { CountBox },
  data () {
    return {
      checked: true,
      count: 100,
      isLoading: false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    }
  },
  mounted () {
    // this.$refs['submit-bar-outside'].style.height = this.$refs['submit-bar'].offsetHeight + 'px'
  }
}
</script>

<style lang="less" scoped>
.goods-card {
  margin: 5px 0;
  padding-left: 13px !important;
  background-color: white;
  border-radius: 10px;
}

.swipe-cell-btn {
  height: 100%;
}

// 价格字体颜色显示红色
.van-card__price {
  color: red
}

.van-card__thumb {
  height: inherit;
  width: inherit;
}

.mythumb {
  height:100%;
  display: flex
}

.cart {
  background: #f5f5f5;
}
</style>
