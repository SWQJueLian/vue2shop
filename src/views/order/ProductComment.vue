<template>
  <div class="user-collect">
    <van-nav-bar
      placeholder
      fixed
      title="评价商品"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <van-card
      v-for="item in commentGoods.goods" :key="item.order_goods_id"
      style="background-color:#fff;"
      num=""
      :price="item.goods_price"
      desc=""
      :title="item.goods_name"
      :thumb="item.goods_image"
    >
      <template #num>
        <div style="display: flex; align-items: center">
          <span @click="handerComment(item.goods_id, item.order_goods_id)" class="find-other">评价</span>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductComment',
  data () {
    return {}
  },
  methods: {
    handerComment (goodsId, orderGoodsId) {
      // 别人提供的api接口没有任何解析，只能猜测这两个是唯一性的判断，所以传递这两个数据到评价页面中
      this.$router.push(`/procomment-detail?goods_id=${goodsId}&order_goods_id=${orderGoodsId}`)
    }
  },
  computed: {
    ...mapGetters('comment', ['commentGoods'])
  }
}
</script>

<style lang="less" scoped>
.goods-content {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.van-cell {
  padding-left: 10px;
  padding-right: 10px;
}
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
  height: 23px;
  line-height: 23px;
  color: #f03c3c;
  margin-right: 5px;
  font-size: 12px;
  border: 1px solid #fa2209;
  border-radius: 18px;
  padding: 0px 10px;
}
</style>
