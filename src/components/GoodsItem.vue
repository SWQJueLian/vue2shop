<template>
  <!--<div class="goods-item" @click="$router.push(`/prodetail/${goods.goods_id}`)">-->
  <div>
    <div class="goods-item">
      <div class="left">
        <!--<img :src="goods.goods_image" alt="" />-->
        <img @click="$router.push(`/prodetail/${goods.goods_id}`)" v-lazy="goods.goods_image" alt="" />
      </div>
      <div class="right">
        <p class="tit text-ellipsis-2" @click="$router.push(`/prodetail/${goods.goods_id}`)">
          {{ goods.goods_name }}
        </p>
        <p class="count">已售{{  goods.goods_sales }}件</p>
        <div class="price">
          <div>
            <span class="new">¥{{ goods.goods_price_min }}</span>
            <div>
              <span class="old">¥{{ goods.goods_price_max }}</span>
            </div>
          </div>
          <div style="margin-right: 5px">
            <van-icon  @click="$toast('点击了收藏')" size="22px"  style="cursor: pointer" name="like" />
            <van-icon  @click="handlerShareSKU" name="share" size="22px"  style="margin-left: 10px" />
            <van-icon @click="handlerAddToCart" size="22px" style="margin-left: 10px;cursor: pointer" name="cart" />
          </div>
        </div>
      </div>
    </div>
    <!--分享面板-->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { addSkuToCart } from '@/apis/cart'

export default {
  data () {
    return {
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  },
  props: {
    goods: {
      type: Object,
      default: () => { return {} }
    }
  },
  methods: {
    async handlerAddToCart () {
      // 这种清空添加商品到购物车都是默认的数量1、默认SKU规格
      await addSkuToCart(this.goods.goods_id, 1, '0')
      await this.$store.dispatch('cart/getCartList')
      this.$toast('在购物车等你哦！')
    },
    handlerShareSKU () {
      this.showShare = true
    },
    onSelect (option) {
      this.$toast(option.name)
      this.showShare = false
    }
  }
}
</script>

<style lang="less" scoped>
.goods-item {
  text-align: start;
  height: 148px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 127px;
    img {
      display: block;
      width: 100%;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 0 0 0px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .count {
      color: #999;
      font-size: 12px;
    }
    .price {
      display: flex;
      justify-content: space-between;
      color: #999;
      font-size: 15px;
      .new {
        color: #f03c3c;
        margin-right: 5px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
      }
    }
  }
}
</style>
