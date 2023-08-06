<template>
  <!--<div class="goods-item" @click="$router.push(`/prodetail/${goods.goods_id}`)">-->
  <div class="goods-item">
    <div class="left">
      <!--<img :src="goods.goods_image" alt="" />-->
      <img @click="$router.push(`/prodetail/${goods.goods_id}`)" v-lazy="goods.goods_image" alt="" />
    </div>
    <div class="right">
      <p class="tit text-ellipsis-2" @click="$router.push(`/prodetail/${goods.goods_id}`)">
        {{
           goods.goods_name
        }}
      </p>
      <p class="count">已售{{  goods.goods_sales }}件</p>
      <div class="price">
        <div>
          <span class="new">¥{{ goods.goods_price_min }}</span>
          <span class="old">¥{{ goods.goods_price_max }}</span>
        </div>
        <div>
          <van-icon  @click="$toast('点击了收藏')" size="22px"  style="" name="like" />
          <van-icon @click="$toast('点击了购物车')" size="22px" style="margin-left: 8px" name="cart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default: () => { return {} }
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
    padding: 10px;
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
      font-size: 16px;
      .new {
        color: #f03c3c;
        margin-right: 10px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
      }
    }
  }
}
</style>
