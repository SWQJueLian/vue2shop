<template>
  <div class="order-list-item">
    <div class="tit">
      <div class="time">{{ order.create_time }}</div>
      <div class="status">
        <span>{{ order.state_text }}</span>
      </div>
    </div>
    <div class="list">
      <div class="list-item" v-for="item in order.goods" :key="item.goods_id">
        <div class="goods-img">
          <img :src="item.goods_image" alt="">
        </div>
        <div class="goods-content">
          <div class="text-ellipsis-2" >
            {{ item.goods_name }}
          </div>
          <van-tag style="margin-right: 5px" plain type="danger">假一赔十</van-tag>
          <van-tag style="margin-right: 5px" plain type="danger">运费险</van-tag>
        </div>
        <div class="goods-trade">
          <p style="color: #333">¥ {{ item.goods_price }}</p>
          <p>x {{ item.total_num }}</p>
        </div>
      </div>
    </div>
    <div class="total">
      共{{ totalNum }}件，实付款 ¥{{ order.total_price }}
    </div>
    <div class="actions">
      <span v-if="order.state_text === '待付款'">立刻付款</span>
      <span v-if="showCancelBtn()">申请取消</span>
      <span v-if="order.state_text === '待收货'">确认收货</span>
      <span v-if="order.state_text === '已完成'">评价</span>
      <span class="highlight">加入购物车</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  computed: {
    // 后端返回没有总数，所以自己计算
    totalNum () {
      return this.order.goods.reduce((sum, item) => sum + item.total_num, 0)
    }
  },
  methods: {
    // 判断是否应该展示申请取消按钮
    showCancelBtn () {
      if (this.order.state_text !== '已取消' && this.order.state_text !== '已完成') {
        return true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order-list-item {
  margin: 10px auto;
  width: 94%;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0 0.5px 2px 0 rgba(0,0,0,.05);
  border-radius: 8px;
  color: #333;
  font-size: 13px;

  .tit {
    height: 24px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .status {
      color: #fa2209;
    }
  }

  .list-item {
    display: flex;
    .goods-img {
      width: 90px;
      height: 90px;
      margin: 0px 10px 10px 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods-content {
      flex: 2;
      line-height: 18px;
      max-height: 36px;
      margin-top: 8px;
    }
    .goods-trade {
      flex: 1;
      line-height: 18px;
      text-align: right;
      color: #b39999;
      margin-top: 8px;
    }
  }

  .total {
    text-align: right;
  }
  .actions {
    text-align: right;
    .highlight {
      color: #fa2209;
      border: 0.5px solid #fa2209;
    }
    span {
      text-align: center;
      min-width: 65px;
      display: inline-block;
      height: 28px;
      line-height: 28px;
      color: #383838;
      border: 0.5px solid #a8a8a8;
      font-size: 14px;
      padding: 0 5px;
      border-radius: 18px;
      margin: 10px 5px;
    }
  }
}

</style>
