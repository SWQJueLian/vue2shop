<template>
  <div class="user-collect">
    <!-- 顶部导航条 -->
    <van-nav-bar
      :title="`我的收藏(${collectListLength})`"
      left-arrow
      @click-left="$router.back()"
    >
      <template #right>
        <van-icon @click="$toast('搜索收藏，逻辑类似，不再实现')" name="search" size="20" />
        <p @click="$toast('编辑收藏和编辑购物车类似，不再实现')" style="margin-left: 10px">编辑</p>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" sticky>
      <van-tab title="默认">
        <van-swipe-cell v-for="goods in collectList" :key="goods.goods_id">
          <van-card
            num=""
            :price="goods.goods_price_min"
            desc=""
            :title="goods.goods_name"
            class="goods-card"
            :thumb="goods.goods_image"
          >
            <template #num>
              <div>
                <van-icon name="cart" @click="handlerAddToCart(goods.goods_id)" size="20px"></van-icon>
              </div>
            </template>
          </van-card>
          <template #right>
            <van-button @click="handlerDeleteCollect(goods.goods_id)" square text="删除" type="danger" class="delete-button" />
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
import { mapGetters, mapMutations, mapState } from 'vuex'
import { addSkuToCart } from '@/apis/cart'
import { setCollectList } from '@/utils/stroage'

export default {
  name: 'UserCollect',
  active: '',
  computed: {
    ...mapState('collect', ['collectList']),
    ...mapGetters('collect', ['collectListLength'])
  },
  methods: {
    ...mapMutations('collect', ['deleteCollect']),
    async handlerAddToCart (goodsId) {
      // 这种清空添加商品到购物车都是默认的数量1、默认SKU规格
      await addSkuToCart(goodsId, 1, '0')
      await this.$store.dispatch('cart/getCartList')
      this.$toast('在购物车等你哦！')
    },
    handlerDeleteCollect (goodsId) {
      // 删除vuex中的数据
      this.deleteCollect(goodsId)
      // 删除localstorage中的数据(直接设置新的就可以了.)
      setCollectList(this.collectList)
    }
  }
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
  // 价格字体颜色显示红色
  .van-card__price {
    color: red
  }
}
</style>
