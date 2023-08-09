<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active" @change="switchTab">
      <van-tab name="all" title="全部"></van-tab>
      <van-tab name="payment" title="待支付"></van-tab>
      <van-tab name="delivery" title="待发货"></van-tab>
      <van-tab name="received" title="待收货"></van-tab>
      <van-tab name="comment" title="待评价"></van-tab>
    </van-tabs>

    <OrderListItem v-for="(item) in orderDataList" :key="item.order_no" :order="item"></OrderListItem>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getOrderList } from '@/apis/order'
export default {
  name: 'OrderPage',
  components: {
    OrderListItem
  },
  data () {
    return {
      active: 'all',
      orderDataList: []
    }
  },
  async created () {
    // 创建vue实例后发送请求初始化数据
    await this.initData()
  },
  methods: {
    async initData () {
      // 订单类型，all-全部，payment-待支付，delivery-待发货，received-待收货，comment-待评价
      const resp = await getOrderList(this.active, 1)
      // console.log(resp, '订单列表')
      this.orderDataList = resp.data.list.data
    },
    // 切换标签页时根据type类型重新加载数据
    switchTab (name, title) {
      this.initData()
    }
  }
}
</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
</style>
