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
    </van-pull-refresh>
    <!--底部提交条-->
    <div style="display: block; height: 50px">
      <div class="footer-fixed">
        <div  class="all-check">
          <van-checkbox  icon-size="18"></van-checkbox>
          全选
        </div>

        <div class="all-total">
          <div class="price">
            <span>合计：</span>
            <span>¥ <i class="totalPrice">99.99</i></span>
          </div>
          <div v-if="true" class="goPay">结算(5)</div>
          <div v-else class="delete">删除</div>
        </div>
      </div>
    </div>
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

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-top: 1px solid #f5f3f3;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay, .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }
}
</style>
