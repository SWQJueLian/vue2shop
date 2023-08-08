<template>
  <!-- v-if： 有数据再显示组件 -->
  <div class="prodetail" v-if="product_detail">
    <van-nav-bar :placeholder=true fixed title="商品详情页" left-arrow @click-left="$router.go(-1)"/>
    <van-swipe @change="onChange" :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.external_url"/>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
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
    <div class="desc">
      <div v-html="product_detail.content"></div>
    </div>
    <!-- 包多一层div，解决van-goods-action固定底部时并没有占据原来的高度，导致内容显示补全。-->
    <div :class="{'showpanel': showPanel}" style="display: block; height: 51px">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot @click="$toast('客服页面..')"/>
        <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartLength" @click="$router.push('/cart')"/>
        <van-goods-action-icon icon="shop-o" text="店铺" badge="12" @click="$toast('店铺页面..')"/>
        <van-goods-action-button type="warning" text="加入购物车" @click="showSKUPanel(true)"/>
        <van-goods-action-button type="danger" text="立即购买" @click="showSKUPanel(false)"/>
      </van-goods-action>
    </div>

    <!-- SKU 选中面板 -->
    <!--
    quota         限购数，0 表示不限购
    quota-used    已经购买过的数量
    hide-stock    是否显示商品剩余库存
    initial-sku   初始化选中规格定义
    goods         商品信息
    goods-id         商品ID
    -->
    <van-sku
      :show-add-cart-btn="showCartBtn"
      :quota=10
      :initial-sku="sku['initial-sku']"
      v-model="showPanel"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    >
      <template #sku-body-top>
        <!--模仿淘宝添加查看评价和配送区域设置-->
        <div>
          <van-cell-group :border=false>
            <van-cell title="因后端接口没有SKU规格，所以都写死数据，只是学习SKU面板的使用" is-link icon="chat-o"/>
            <van-cell title="查看所有评价" is-link icon="chat-o" @click="$toast('查看所有评论的页面')"/>
            <van-cell center title="配送区域" is-link label="📍广东省广州市白云区"
                      @click="$router.push('/useraddress')"/>
          </van-cell-group>
        </div>
      </template>
      <template #sku-actions-top>
        <!--模仿淘宝和京东，添加一行提示文本-->
        <div style="text-align: center">当前商品可使用xxxx优惠卷购买</div>
      </template>
    </van-sku>
  </div>
</template>

<script>
import { getProComments, getProCommentsCount, getProductDetail } from '@/apis/product'
// eslint-disable-next-line no-unused-vars
import defaultImg from '@/assets/default-avatar.png'
import { mapGetters } from 'vuex'
import { addSkuToCart } from '@/apis/cart'
import showNeedLoginDialog from '@/mixins/loginConfirmDialog'

export default {
  name: 'ProductDetailPage',
  mixins: [showNeedLoginDialog],
  async created () {
    // 获取商品详情信息
    const resp = await getProductDetail(this.goodsId)
    console.log('商品详情：', resp)
    this.product_detail = resp.data.detail
    this.images = this.product_detail.goods_images

    // 获取评价信息
    const commentResp = await getProComments(this.goodsId, -1, 1)
    // console.log(commentResp)
    this.comment_data = commentResp.data.list

    const { data: { total } } = await getProCommentsCount(this.goodsId)
    this.comment_count = total.all
  },
  data () {
    return {
      showCartBtn: true,
      showPanel: false, // 展示加购面板
      sku: {
        'initial-sku': {
          s1: '1',
          s2: '2',
          // 初始选中数量(也就是购买数量)
          selectedNum: 3
        },
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '颜色', // skuKeyName：规格类目名称
            k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: '1', // skuValueId：规格值 id
                name: '红色', // skuValueName：规格值名称
                imgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F07bab236-0d84-4003-a779-b93d3e67c174%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693807215&t=62c5a92aef58073d4a75d39018c066a8', // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F07bab236-0d84-4003-a779-b93d3e67c174%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693807215&t=62c5a92aef58073d4a75d39018c066a8' // 用于预览显示的规格类目图片
              },
              {
                id: '2', // skuValueId：规格值 id
                name: '蓝色', // skuValueName：规格值名称
                imgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F1e0466ff-3a60-4544-9630-318439662daf%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693807215&t=59fe29fa7e4da43f81d8968f44d17821', // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F1e0466ff-3a60-4544-9630-318439662daf%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693807215&t=59fe29fa7e4da43f81d8968f44d17821' // 用于预览显示的规格类目图片
              }
            ],
            largeImageMode: false //  是否展示大图模式
          },
          {
            k: '尺寸', // skuKeyName：规格类目名称
            k_s: 's2', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: '1', // skuValueId：规格值 id
                name: 'XL' // skuValueName：规格值名称
                // imgUrl: 'https://img01.yzcdn.cn/2.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                // previewImgUrl: 'https://img01.yzcdn.cn/2.jpg' // 用于预览显示的规格类目图片
              },
              {
                id: '2', // skuValueId：规格值 id
                name: 'L', // skuValueName：规格值名称
                imgUrl2: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fec617d77-b385-4b1d-9b47-eb27fb9089a8%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693807215&t=2288abe718a9d95ea5119264febdeda3', // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl2: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fec617d77-b385-4b1d-9b47-eb27fb9089a8%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693807215&t=2288abe718a9d95ea5119264febdeda3' // 用于预览显示的规格类目图片
              },
              {
                id: '3', // skuValueId：规格值 id
                name: 'M' // skuValueName：规格值名称
                // imgUrl: 'https://img01.yzcdn.cn/2.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                // previewImgUrl: 'https://img01.yzcdn.cn/2.jpg' // 用于预览显示的规格类目图片
              }
            ],
            largeImageMode: false //  是否展示大图模式
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId
            s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
            price: 15.98 * 100, // 价格（单位分）
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 7777, // skuId
            s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
            price: 16.98 * 100, // 价格（单位分）
            stock_num: 85 // 当前 sku 组合对应的库存
          },
          {
            id: 8888, // skuId
            s1: '2', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
            price: 20 * 100, // 价格（单位分）
            stock_num: 10 // 当前 sku 组合对应的库存
          }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 999, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [],
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 数据结构见下方文档
        picture: 'https://img01.yzcdn.cn/2.jpg'
      },
      messageConfig: {
        // 数据结构见下方文档
      },
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
    },
    // 展示SKU选中面板
    showSKUPanel (showCartBtn) {
      // console.log(showCartBtn)
      this.showCartBtn = showCartBtn
      this.showPanel = true
    },
    // 购买按钮，skuData是回调参数
    async onBuyClicked (skuData) {
      if (this.showNeedLoginDialog()) {
        return
      }
      console.log('点击了购买按钮', skuData)
    },
    // 加购按钮，skuData是回调参数
    async onAddCartClicked (skuData) {
      /**
       * 加购时不应该限制必须登录，很多平台都不需要登录，然加购就存储到localstorage中，
       * 下单的时候让用户直接填手机号地址等信息。如果用户中途登录了就将购物车信息与服务器返回的购物车进行合并操作（之前做python商品也做过）
       * */
      if (this.showNeedLoginDialog()) {
        return
      }
      console.log('点击了加购按钮', skuData)
      // 由于学习的接口并没有做SKU规格分类，所以这里就拿详情页中的主信息即可
      // 实际上应该拿skuData.selectedSkuComb.id 拿到就是渲染出来的分类选中的skuid
      // const resp = await addSkuToCart(this.goodsId, skuData.selectedNum, skuData.selectedSkuComb.id)  //goods_sku_id
      const resp = await addSkuToCart(this.goodsId, skuData.selectedNum, this.product_detail.skuList[0].goods_sku_id) // 暂时写死为0
      console.log('addSkuToCart: ', resp)
      // 更新vuex中的购物车数量
      // 接口中的购物车数量不对，返回的是商品数量*商品购买件数。但是京东和淘宝都是返回商品的数量，不需要乘商品的购买件数
      // this.$store.commit('cart/updateCartTotal', resp.data.cartTotal)
      // 所以这里我就请求获取购物车列表，更新vuex中的数据即可
      await this.$store.dispatch('cart/getCartList')
      // 添加加购成功提示
      this.$toast('加入购物车成功')
      // 加购后就隐藏SKU选择面板
      this.showPanel = false
    }
  },
  computed: {
    goodsId () {
      return this.$route.params.productid
    },
    ...mapGetters('user', ['isLogin']),
    ...mapGetters('cart', ['cartLength'])
  }
}
</script>

<style lang="less" scoped>
/* 追加van-goods-action的样式，修复顶部有badge时内容会溢出一点点的问题、右边距要比左边距大一些，不然不好看。*/
.van-goods-action {
  padding: 2px 5px 2px 2px;
}

/* 显示面板的时候将fix的固定高度去掉 */
.showpanel {
  //display: none !important;
  height: 0 !important;
}

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
