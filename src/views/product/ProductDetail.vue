<template>
  <!-- v-if： 有数据再显示组件 -->
  <div class="prodetail" v-if="product_detail">
    <van-nav-bar :placeholder=true fixed title="商品详情页" left-arrow @click-left="$router.go(-1)"/>
    <van-swipe @change="onChange" :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.external_url" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/ {{ images.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ product_detail.goods_price_min }}</span>
          <span class="oldprice">￥{{ product_detail.goods_price_max }}</span>
        </div>
        <div class="sellcount">已售{{ product_detail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ product_detail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed"/>七天无理由退货</span>
          <span><van-icon name="passed"/>48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow"/>
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 (5条)</div>
        <div class="right">查看更多
          <van-icon name="arrow"/>
        </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in 3" :key="item">
          <div class="top">
            <img src="http://cba.itlike.com/public/uploads/10001/20230321/a0db9adb2e666a65bc8dd133fbed7834.png" alt="">
            <div class="name">神雕大侠</div>
            <van-rate :size="16" :value="5" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            质量很不错 挺喜欢的
          </div>
          <div class="time">
            2023-03-21 15:01:35
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc" style="padding-bottom: 55px">
      <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/kHgx21fZMWwqirkMhawkAw.jpg" alt="">
      <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/0rRMmncfF0kGjuK5cvLolg.jpg" alt="">
      <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/2P04A4Jn0HKxbKYSHc17kw.jpg" alt="">
      <img src="https://uimgproxy.suning.cn/uimg1/sop/commodity/MT4k-mPd0veQXWPPO5yTIw.jpg" alt="">
    </div>

    <van-goods-action :safe-area-inset-bottom=true>
      <van-goods-action-icon icon="chat-o" text="客服" dot/>
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5"/>
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12"/>
      <van-goods-action-button type="warning" text="加入购物车"/>
      <van-goods-action-button type="danger" text="立即购买"/>
    </van-goods-action>
  </div>
</template>

<script>
import { getProductDetail } from '@/apis/product'

export default {
  name: 'ProductDetailPage',
  async created () {
    const resp = await getProductDetail(this.$route.params.productid)
    console.log(resp)
    this.product_detail = resp.data.detail
    this.images = this.product_detail.goods_images
  },
  data () {
    return {
      product_detail: '',
      current: 0,
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  methods: {
    // 轮播改变时触发，index为当前页索引
    onChange (index) {
      this.current = index
    }
  }
}
</script>

<style lang="less" scoped>
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
}

.prodetail {
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  img {
    display: block;
    width: 100%;
  }
  .desc {
    width: 100%;
    overflow: scroll;

    ::v-deep img {
      display: block;
      width: 100% !important;
    }
  }

  .info {
    padding: 10px;
  }

  .title {
    display: flex;
    justify-content: space-between;

    .now {
      color: #fa2209;
      font-size: 20px;
    }

    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }

    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }

  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }

  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;

    .left-words {
      span {
        margin-right: 10px;
      }

      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    text-align: start;
    padding: 10px;
  }

  .comment-title {
    display: flex;
    justify-content: space-between;

    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;

    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;

      img {
        width: 20px;
        height: 20px;
      }

      .name {
        margin: 0 10px;
      }
    }

    .time {
      color: #999;
    }
  }

}

.tips {
  padding: 10px;
}
</style>
