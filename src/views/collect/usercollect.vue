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
        <p @click="$toast('编辑收藏和购物车类似，不再实现。你可以直接向左滑商品使用删除功能')" style="margin-left: 10px">编辑</p>
      </template>
    </van-nav-bar>
    <van-notice-bar
      left-icon="volume-o"
      text="我的收藏数据只存储在本地，因为后端没有接口提供"
    />
    <van-tabs v-model="active" sticky>
      <van-tab title="默认">
        <van-empty v-if="collectList.length<=0" description="空空如也~" />
        <van-swipe-cell v-else v-for="goods in collectList" :key="goods.goods_id" class="goods-card">
          <van-card style="background-color:#fff;"
            num=""
            :price="goods.goods_price_min"
            desc=""
            :title="goods.goods_name"
            :thumb="goods.goods_image"
          >
            <template #num>
              <div style="display: flex; align-items: center">
                <span @click="$toast('找相似点击')" class="find-other">找相似</span>
                <span @click="$toast('去店铺点击')" class="find-other">去店铺</span>
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
import showNeedLoginDialog from '@/mixins/login-confirm-dialog'

export default {
  name: 'UserCollect',
  mixins: [showNeedLoginDialog],
  active: '',
  computed: {
    ...mapState('collect', ['collectList']),
    ...mapGetters('collect', ['collectListLength'])
  },
  methods: {
    ...mapMutations('collect', ['deleteCollect']),
    async handlerAddToCart (goodsId) {
      if (this.showNeedLoginDialog()) {
        return
      }
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
  background: #f5f5f5;
  .delete-button {
    height: 100%;
  }
  // 价格字体颜色显示红色
  .van-card__price {
    color: red
  }
  .goods-card {
    margin: 5px 5px;
    background-color: white;
    border-radius: 10px;
    -webkit-border-radius: 10px;
  }
}
.van-card__title {
  font-size: 13px;
}
.find-other {
  color: #333333;
  margin-right: 5px;
  font-size: 12px;
  border: 1px solid #c7c7c7;
  border-radius: 10px;
  padding: 0px 5px;
}
</style>
