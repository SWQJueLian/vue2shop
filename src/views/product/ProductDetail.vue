<template>
  <!-- v-if： 有数据再显示组件 -->
  <div class="prodetail" v-if="product_detail">
    <van-nav-bar :placeholder=true fixed title="商品详情页" left-arrow @click-left="$router.go(-1)"/>
    <van-swipe @change="onChange" :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.external_url"/>
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
        <div class="left">商品评价 ({{ comment_count }}条)</div>
        <div class="right">查看更多
          <van-icon name="arrow"/>
        </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="(item, index) in comment_data.data" :key="index">
          <div class="top">
            <img :src="item.user.avatar_url || defaultImg" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :value="item.score / 2" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>
    <!-- 商品描述 -->
    <div class="desc" style="padding-bottom: 55px">
      <div v-html="product_detail.content"></div>
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
import { getProComments, getProCommentsCount, getProductDetail } from '@/apis/product'
// eslint-disable-next-line no-unused-vars
import defaultImg from '@/assets/default-avatar.png'

export default {
  name: 'ProductDetailPage',
  async created () {
    const resp = await getProductDetail(this.$route.params.productid)
    // console.log(resp)
    this.product_detail = resp.data.detail
    this.images = this.product_detail.goods_images

    // 获取评价信息
    const commentResp = await getProComments(this.$route.params.productid, -1, 1)
    // console.log(commentResp)
    this.comment_data = commentResp.data.list

    const { data: { total } } = await getProCommentsCount(this.$route.params.productid)
    this.comment_count = total.all
  },
  data () {
    return {
      defaultImg, // 用户默认头像
      comment_data: '', // 商品评价列表数据
      product_detail: '', // 商品详情数据
      current: 0,
      images: [], // 商品详情轮播图
      comment_count: 0 // 商品评价总数
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
