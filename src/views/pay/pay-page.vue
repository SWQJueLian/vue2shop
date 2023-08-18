<template>
  <div class="pay">
    <van-nav-bar fixed title="订单结算台" left-arrow @click-left="$router.go(-1)"/>

    <!-- 地址相关 -->
    <div class="address" @click="$router.push('/useraddress')">

      <div class="left-icon">
        <van-icon name="logistics"/>
      </div>

      <div class="info" v-if="defaultAddress">
        <div class="info-content">
          <span class="name">{{ defaultAddress.name }}</span>
          <span class="mobile">{{ defaultAddress.phone }}</span>
        </div>
        <div class="info-address">
          {{ detailAddress }}
        </div>
      </div>

      <div class="info" v-else>
        请选择配送地址
      </div>

      <div class="right-icon">
        <van-icon name="arrow"/>
      </div>
    </div>

    <!-- 订单明细 -->
    <div class="pay-list">
      <div class="list">
        <div class="goods-item" v-for="item in order.goodsList" :key="item.goods_id">
          <div class="left">
            <img :src="item.goods_image" alt=""/>
          </div>
          <div class="right">
            <p class="tit text-ellipsis-2">
              {{ item.goods_name }}
            </p>
            <p class="info">
              <span class="count">x{{ item.total_num }}</span>
              <span class="price">¥{{ item.goods_price }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="flow-num-box">
        <span>共 {{ order.orderTotalNum }} 件商品，合计：</span>
        <span class="money">￥{{ order.orderPayPrice }}</span>
      </div>

      <div class="pay-detail">
        <div class="pay-cell">
          <span>订单总金额：</span>
          <span class="red">￥{{ order.orderPayPrice }}</span>
        </div>

        <!--<div class="pay-cell">-->
          <!--<span>优惠券：</span>
          <span>无优惠券可用</span>-->
          <!-- 优惠券单元格 -->
          <van-coupon-cell
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @click="showList = true"
          />
        <!--</div>-->

        <div class="pay-cell">
          <span>配送费用：</span>
          <span v-if="!defaultAddress">请先选择配送地址</span>
          <span v-else class="red">+￥0.00</span>
        </div>
      </div>

      <!-- 支付方式 -->
      <div class="pay-way">
        <span class="tit">支付方式：</span>
        <van-radio-group v-model="radio">
          <van-cell-group :border="false">
            <van-cell icon="balance-o" :title="`余额支付（可用 ¥ ${personal.balance} 元）`" clickable
                      @click="radio = '1'">
              <template #right-icon>
                <van-radio name="1"/>
              </template>
            </van-cell>
            <van-cell icon="alipay" title="支付宝" clickable @click="radio = '2'">
              <template #right-icon>
                <van-radio name="2"/>
              </template>
            </van-cell>
            <van-cell icon="wechat" title="微信" clickable @click="radio = '3'">
              <template #right-icon>
                <van-radio name="3"/>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>

      </div>

      <!-- 买家留言 -->
      <div class="buytips">
        <textarea v-model="remark" placeholder="选填：买家留言（50字内）" name="" id="" cols="30" rows="10"></textarea>
      </div>
    </div>

    <!-- 底部提交 -->
    <div class="footer-fixed">
      <div class="left">实付款：<span>￥{{ order.orderPayPrice }}</span></div>
      <div class="tipsbtn" @click="handlerSubmitOrder">提交订单</div>
    </div>
    <!-- 优惠券列表 -->
    <van-popup
      v-model="showList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px;"
    >
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { checkoutOrder, submitOrder } from '@/apis/order'
import { Notify } from 'vant'
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
}
export default {
  name: 'PayIndex',
  data () {
    return {
      order: '', // 订单结算数据
      personal: '', // 个人数据
      radio: '1', // 支付方式
      remark: '', // 买家留言,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false
    }
  },
  computed: {
    ...mapGetters('address', ['defaultAddress']),
    // 计算用户的详情地址
    detailAddress () {
      // 将省市区拿出来，然后加上detail就是了
      const str = Object.values(this.defaultAddress.region)
      str.push(this.defaultAddress.detail)
      return str.join(',')
    },
    // cartIds () {
    //   return this.$route.query.cartIds
    // },
    // mode () {
    //   return this.$route.query.mode
    // }
    backUrl () {
      return this.$route.query.backUrl
    }
  },
  methods: {
    ...mapActions('address', ['getUserAddressListAndDefaultID']),
    async handlerSubmitOrder () {
      const resp = await submitOrder(this.$route.query)
      Notify({ type: 'success', message: '订单提交成功' })
      if (resp.data && resp.message === 'success') {
        // 如有又backurl，则返回到原来的url中，否则跳转到订单页面
        if (this.backUrl) {
          this.$router.replace(this.backUrl)
        } else {
          this.$router.replace('/order')
        }
      }
    },
    onChange (index) {
      this.showList = false
      this.chosenCoupon = index
    },
    onExchange (code) {
      this.coupons.push(coupon)
    }
  },
  async created () {
    // 进入订单结算时就加载默认用户地址ID和用户地址ID信息
    await this.getUserAddressListAndDefaultID()
    // 获取订单结算数据
    // const { data: { order, personal } } = await checkoutOrder({
    //   mode: this.mode, // 需要传递下单的途径
    //   cartIds: this.cartIds
    // })
    const {
      data: {
        order,
        personal
      }
    } = await checkoutOrder(this.$route.query)
    this.order = order
    this.personal = personal
  }
}
</script>

<style lang="less" scoped>
.pay {
  padding-top: 46px;
  padding-bottom: 46px;

  ::v-deep {
    .van-nav-bar__arrow {
      color: #333;
    }
  }
}

.address {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-size: 14px;
  color: #666;
  position: relative;
  background: url(@/assets/border-line.png) bottom repeat-x;
  background-size: 60px auto;

  .left-icon {
    margin-right: 20px;
  }

  .right-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-7px);
  }
  .mobile {
    margin-left: 6px;
  }
}

.goods-item {
  height: 100px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;

  .left {
    width: 100px;

    img {
      display: block;
      width: 80px;
      margin: 10px auto;
    }
  }

  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    padding-right: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: #333;

    .info {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;

      .price {
        color: #fa2209;
      }
    }
  }
}

.flow-num-box {
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px;
  font-size: 14px;
  border-bottom: 1px solid #efefef;

  .money {
    color: #fa2209;
  }
}

.pay-cell {
  font-size: 14px;
  padding: 10px 12px;
  color: #333;
  display: flex;
  justify-content: space-between;

  .red {
    color: #fa2209;
  }
}

.pay-detail {
  border-bottom: 1px solid #efefef;
  .van-cell {
    padding-left: 12px;
    padding-right: 12px;
  }
}

.pay-way {
  font-size: 14px;
  border-bottom: 1px solid #efefef;
  color: #333;

  .tit {
    padding: 10px 12px;
    line-height: 30px;
  }

  .pay-cell {
    padding: 10px 0;
  }

  .van-icon {
    font-size: 20px;
    margin-right: 5px;
  }
}

.buytips {
  display: block;

  textarea {
    display: block;
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 12px;
    height: 100px;
  }
}

.footer-fixed {
  position: fixed;
  background-color: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  border-top: 1px solid #efefef;
  font-size: 14px;
  display: flex;

  .left {
    flex: 1;
    padding-left: 12px;
    color: #666;

    span {
      color: #fa2209;
    }
  }

  .tipsbtn {
    width: 121px;
    background: linear-gradient(90deg, #f9211c, #ff6335);
    color: #fff;
    text-align: center;
    line-height: 46px;
    display: block;
    font-size: 14px;
  }
}
</style>
