<template>
  <div class="user">
    <van-notice-bar
      left-icon="volume-o"
      text="该页面只实现订单查看、收货地址、我的收藏、退出登录功能，其他的没有接口可以实现。"
    />
    <div class="head-page" v-if="isLogin">
      <div class="head-img">
        <img src="@/assets/default-avatar.png" alt="" />
      </div>
      <div class="info">
        <div class="mobile">{{ detail.mobile }}</div>
        <div class="vip">
          <van-icon name="diamond-o" />
          普通会员
        </div>
      </div>
    </div>

    <div v-else class="head-page" @click="$router.replace(`/login?back=${$route.fullPath}`)">
      <div class="head-img">
        <img src="@/assets/default-avatar.png" alt="" />
      </div>
      <div class="info">
        <div class="mobile">未登录</div>
        <div class="words">点击登录账号</div>
      </div>
    </div>

    <div class="my-asset">
      <div class="asset-left">
        <div class="asset-left-item">
          <span>{{ detail.balance || 0 }}</span>
          <span>账户余额</span>
        </div>
        <div class="asset-left-item">
          <span>0</span>
          <span>积分</span>
        </div>
        <div class="asset-left-item" @click="$toast('优惠卷页面')">
          <span>0</span>
          <span>优惠券</span>
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-right-item" @click="$toast('我的钱包...')">
          <van-icon name="balance-pay" />
          <span>我的钱包</span>
        </div>
      </div>
    </div>
    <div class="order-navbar">
      <div class="order-navbar-item" @click="$router.push('/order?dataType=all')">
        <van-icon name="balance-list-o" :badge="orderTotal" />
        <span>全部订单</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/order?dataType=payment')">
        <van-icon name="clock-o" :badge="orderTodoCount.payment" />
        <span>待支付</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/order?dataType=delivery')">
        <van-icon name="logistics" :badge="orderTodoCount.delivery" />
        <span>待发货</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/order?dataType=received')">
        <van-icon name="send-gift-o" :badge="orderTodoCount.received" />
        <span>待收货</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/order?dataType=comment')">
        <van-icon name="comment-o" badge="0" />
        <span>待评价</span>
      </div>
    </div>

    <div class="service">
      <div class="title">我的服务</div>
      <div class="content">
        <div class="content-item" @click="$router.push('/useraddress')">
          <van-icon name="records" />
          <span>收货地址</span>
        </div>
        <div class="content-item" @click="$router.push('/usercollect')">
          <van-icon name="goods-collect-o" />
          <span>我的收藏</span>
        </div>
        <div class="content-item" @click="$toast('领卷中心')">
          <van-icon name="gift-o" />
          <span>领券中心</span>
        </div>
        <div class="content-item" @click="$toast('优惠卷页面')">
          <van-icon name="gift-card-o" />
          <span>优惠券</span>
        </div>
        <div class="content-item" @click="$toast('帮助信息')">
          <van-icon name="question-o" />
          <span>我的帮助</span>
        </div>
        <div class="content-item" @click="$toast('我的积分')">
          <van-icon name="balance-o" />
          <span>我的积分</span>
        </div>
        <div class="content-item" @click="$toast('售后')">
          <van-icon name="refund-o" />
          <span>退换/售后</span>
        </div>
      </div>
    </div>

    <div class="logout-btn">
      <button @click="handlerLogout">退出登录</button>
    </div>
  </div>
</template>

<script>
import { getOrderTodoCount, getUserInfo } from '@/apis/users'
import { getOrderList } from '@/apis/order'

export default {
  name: 'UserPage',
  data () {
    return {
      detail: {},
      orderTodoCount: {},
      orderTotal: 0
    }
  },
  created () {
    if (this.isLogin) {
      this.getUserInfoDetail()
      this.initOrderData()
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters['user/userinfo'].token
    }
  },
  methods: {
    // 后端返回的数据没有全部订单的数量，只能获取全部订单然后拿到订单数量了....
    async initOrderData () {
      // 订单类型，all-全部，payment-待支付，delivery-待发货，received-待收货，comment-待评价
      const resp = await getOrderList('all', 1)
      // console.log(resp, '订单列表')
      this.orderTotal = resp.data.list.total
    },
    async getUserInfoDetail () {
      const { data: { userInfo } } = await getUserInfo()
      this.detail = userInfo
      // console.log(this.detail)
      // 获商品状态数量
      const resp = await getOrderTodoCount()
      this.orderTodoCount = resp.data.counts
    },
    handlerLogout () {
      this.$dialog.confirm({
        title: '退出',
        message: '您确定要退出吗？',
        theme: 'round-button'
      })
        .then(() => {
          // 1. 发送请求到后端登出
          // 没有接口， 发个锤子
          // 2、清除vuex中的数据
          this.$store.commit('user/updateUserInfo', {})
          // 清除购物车
          this.$store.commit('address/updateUserAddressList', [])
          // 清除收藏
          // 这里就不清除了，因为收藏本身就是用localstorage实现的....为了方便测试。
          this.detail = {}
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-bottom: 50px;
}

.head-page {
  height: 130px;
  background: url("http://cba.itlike.com/public/mweb/static/background/user-header2.png");
  background-size: cover;
  display: flex;
  align-items: center;
  .head-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.info {
  .mobile {
    margin-bottom: 5px;
    color: #c59a46;
    font-size: 18px;
    font-weight: bold;
  }
  .vip {
    display: inline-block;
    background-color: #3c3c3c;
    padding: 3px 5px;
    border-radius: 5px;
    color: #e0d3b6;
    font-size: 14px;
    .van-icon {
      font-weight: bold;
      color: #ffb632;
    }
  }
}

.my-asset {
  display: flex;
  padding: 20px 0;
  font-size: 14px;
  background-color: #fff;
  .asset-left {
    display: flex;
    justify-content: space-around; // 效果比space-evenly好
    flex: 3;
    .asset-left-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:first-child {
        margin-bottom: 5px;
        color: #ff0000;
        font-size: 16px;
      }
    }
  }
  .asset-right {
    flex: 1;
    .asset-right-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
      }
    }
  }
}

.order-navbar {
  display: flex;
  padding: 15px 0;
  margin: 10px;
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;
  .order-navbar-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    .van-icon {
      font-size: 24px;
      margin-bottom: 5px;
    }
  }
}

.service {
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;
  margin: 10px;
  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    font-size: 16px;
  }
  .content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 14px;
    background-color: #fff;
    border-radius: 5px;
    .content-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 25%;
      margin-bottom: 20px;

      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
        color: #ff3800;
      }
    }
  }
}

.logout-btn {
  button {
    width: 60%;
    margin: 10px auto;
    display: block;
    font-size: 13px;
    color: #616161;
    border-radius: 9px;
    border: 1px solid #dcdcdc;
    padding: 7px 0;
    text-align: center;
    background-color: #fafafa;
  }
}
</style>
