<template>
  <div class="comment-sku">
    <van-nav-bar
      title="评价商品"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="main">
      <div class="comment-sku-item" v-for="item in commentGoods.goods" :key="item.order_goods_id">
        <!--商品信息-->
        <div class="goods-info">
          <div class="goods-img">
            <img :src="item.goods_image" alt="">
          </div>
          <div class="goods-content">
            <div class="text-ellipsis-2">
              {{ item.goods_name }}
            </div>
            <div style="display: flex; flex-direction: row-reverse">
              <div style="margin-right: 10px;margin-bottom: 10px">
                <span @click="handerComment(item.goods_id, item.order_goods_id)" style="border: 1px solid #fa2c20;border-radius: 18px;padding: 3px 10px;color: #fa2c20">
                  评价
                </span>
              </div>
            </div>
          </div>
        </div>
        <!--分割线-->
        <div class="van-hairline--bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductComment',
  data () {
    return {
    }
  },
  methods: {
    handerComment (goodsId, orderGoodsId) {
      this.$router.push(`/procomment-detail?goods_id=${goodsId}&order_goods_id=${orderGoodsId}`)
    }
  },
  computed: {
    ...mapGetters('comment', ['commentGoods'])
  }
}
</script>

<style lang="less" scoped>
.goods-img {
  width: 80px;
  height: 80px;
  margin: 0px 10px 10px 0;
  img {
    width: 100%;
    height: 100%;
  }
}
.goods-content {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.goods-info {
  display: flex;
}
.main {
  padding: 0px 10px;
}
.rate {
  padding-left: 10px;
}
.van-cell {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
