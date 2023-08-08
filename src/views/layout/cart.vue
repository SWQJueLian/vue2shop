<template>
  <div class="cart">
    <!--<van-pull-refresh style="min-height: 100vh;" v-model="isLoading" @refresh="onRefresh">-->
    <!-- 顶部导航条-->
    <van-nav-bar left-arrow title="购物车" fixed placeholder :right-text="isEdit ? '完成': '编辑'"
                 @click-right="editCart"/>
    <div style="padding: 6px" v-if="cartLength>0">
      <!--商品SKU-->
      <van-swipe-cell v-for="item in cartList" :key="item.id">
        <van-card
          :origin-price="item.goods.goods_price_min"
          :num="item.goods_num"
          :price="item.goods.goods_price_max"
          desc=""
          :title="item.goods.goods_name"
          class="goods-card"
          :thumb="item.goods.goods_image">
          <template #title>
            <div @click="$router.push(`/prodetail/${item.goods_id}`)" class="text-ellipsis-2 sku-title">
              {{ item.goods.goods_name }}
            </div>
          </template>
          <template #thumb>
            <div class="mythumb">
              <!-- 不能直接用v-model双向绑定 -->
              <van-checkbox
                :value="item.isChecked"
                @click="updateCartCheckBox(item)" icon-size="17"
                checked-color="#ee0a24">
              </van-checkbox>

              <!-- @click="$router.push(`/prodetail/${item.goods_id}`)" 点击商品的头像时候进入商品的详情页-->
              <van-image
                @click="$router.push(`/prodetail/${item.goods_id}`)"
                style="margin-left: 8px"
                width="100px"
                height="100px"
                fit="cover"
                :src="item.goods.goods_image"
              />
            </div>
          </template>
          <template #desc>
            <!-- 占个位置而已，没啥特殊 -->
            <div style="height: 10px"></div>
          </template>
          <template #tags>
            <van-tag round plain type="danger" style="margin-right: 3px">假一赔十</van-tag>
            <van-tag round plain type="danger" style="margin-right: 3px">极速退款</van-tag>
          </template>
          <template #num>
            <CountBox :value="item.goods_num"
                      @input="updateCartNum($event, item.goods_id, item.goods_sku_id)"></CountBox>
          </template>
        </van-card>
        <!--自定义右滑动的内容-->
        <template #right>
          <van-button @click="handlerAddToCollect(item.goods)" square type="primary" text="收藏"
                      class="swipe-cell-btn"/>
          <van-button @click="deleteCartSKU(item.id)" square text="删除" type="danger" class="swipe-cell-btn"/>
        </template>
      </van-swipe-cell>
    </div>
    <!-- 空购物车 -->
    <div class="empty-cart" v-else>
      <img src="@/assets/empty.png" alt="">
      <div class="tips">
        您的购物车是空的, 快去逛逛吧
      </div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
    <!--底部提交条-->
    <div style="height: 48px; background-color:#fff;" v-if="cartLength>0">
      <div class="footer-fixed">
        <div class="all-check">
          <!-- @click="checkedAll(!isAllChecked)" 直接将是否全部选中的标记位取反就可以实现全选/全不选切换 -->
          <van-checkbox checked-color="#ee0a24" icon-size="18" :value="isAllChecked"
                        @click="checkedAll(!isAllChecked)">全选
          </van-checkbox>
        </div>
        <div class="all-total">
          <div class="price" v-if="!isEdit">
            <span>合计：</span>
            <span>¥ <i class="totalPrice">{{ toThousands(totalPrice) }}</i></span>
          </div>
          <van-button v-if="!isEdit" @click="gotoPay" round color="linear-gradient(to right, #ff6034, #ee0a24)">
            去结算({{ cartChoieNum }})
          </van-button>
          <van-button @click="deleteCartSKU" v-else round color="linear-gradient(to right, #ff6034, #ee0a24)">
            删除({{ cartChoieNum }})
          </van-button>
        </div>
      </div>
    </div>
    <!--</van-pull-refresh>-->
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapGetters, mapState } from 'vuex'
import { toThousands } from '@/utils/tools'
import { deleteSKUCheckStatus, setCollectList, setSKUCheckStatus, updateSKUCheckStatus } from '@/utils/stroage'

export default {
  name: 'CartPage',
  components: { CountBox },
  data () {
    return {
      // allChecked: false, // 全选 # 从vuex中获取
      isLoading: false, // 下拉刷新控制flag
      isEdit: false // 是否处于编辑模式
    }
  },
  methods: {
    gotoPay () {
      // 用,拼接购物车id
      const cartIds = this.$store.getters['cart/choiceSKUIDs'].join(',')
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'cart',
          cartIds
        }
      })
    },
    toThousands,
    // 删除购物项目
    deleteCartSKU (id) {
      this.$store.dispatch('cart/deleteCartItem', !this.isEdit ? [id] : this.$store.getters['cart/choiceSKUIDs'])
    },
    // 更新商品数量
    // eslint-disable-next-line camelcase
    updateCartNum (value, goods_id, sku_id) {
      console.log(value, goods_id, sku_id)
      this.$store.dispatch('cart/changeSKUCount', {
        goods_id,
        goods_num: value,
        goods_sku_id: sku_id
      })
    },
    // 切换选中状态，直接将item丢过来然后修改就可以了
    updateCartCheckBox (item) {
      item.isChecked = !item.isChecked
      // 更新在localstorage中保存的SKU选中状态
      updateSKUCheckStatus(item.id, item.isChecked)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 1000)
    },
    checkedAll (check) {
      this.$store.commit('cart/checkAll', check)
      // 更新localstorage中存储的选中状态
      if (!check) {
        deleteSKUCheckStatus()
      } else {
        // 全选就直接把所有的选中ID一次性添加进去就行了。
        setSKUCheckStatus(this.choiceSKUIDs)
      }
    },
    editCart () {
      this.isEdit = !this.isEdit
    },
    handlerAddToCollect (item) {
      this.$store.commit('collect/addSKUToCollectList', item)
      // 保存到本地
      setCollectList(this.$store.state.collect.collectList)
      this.$toast('收藏成功！')
    }
  },
  created () {
    // 进入首页的时候已经获取过购物车了，所以就不需要获取了（嗯...还是获取一下吧）
    // // 如果登录了才获取购物车列表
    if (this.$store.state.user.userinfo.token) {
      this.$store.dispatch('cart/getCartList')
    }
    // } else {
    //   this.$toast('需要登录后才能查看购物车哦！')
    // }
    // 获取购物列表
    // const { data } = await getCartList()
    // 设置购物车信息
    // this.cartDatas = data.list
    // this.cartDatas.forEach(item => item.isChecked)
    // 更新vuex中的购物车数量
    // this.updateCartTotal(this.cartDatas.length)
    // console.log('getCartList: ', data)
  },
  mounted () {
    // this.$refs['submit-bar-outside'].style.height = this.$refs['submit-bar'].offsetHeight + 'px'
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartChoieNum', 'cartLength', 'totalPrice', 'isAllChecked', 'choiceSKUIDs'])
  }
}

</script>

<style lang="less" scoped>
.goods-card {
  margin: 5px 0;
  padding-left: 8px !important;
  background-color: white;
  border-radius: 10px;
}

.swipe-cell-btn {
  height: 100% !important;
}

.van-button {
  min-width: 90px;
  height: 36px;
  line-height: 36px;
}

// 价格字体颜色显示红色
.van-card__price {
  color: red
}

.van-card__thumb {
  height: inherit;
  width: inherit;
}

.mythumb {
  height: 100%;
  display: flex
}

.cart {
  background: #f5f5f5;
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-top: 1px solid #f5f3f3;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    padding-left: 2px;
    display: flex;
    align-items: center;

    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    align-items: center; // 垂直居中
    display: flex;
    line-height: 36px;

    .price {
      font-size: 14px;
      margin-right: 10px;

      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay, .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;

      &.disabled {
        background-color: #ff9779;
      }
    }
  }
}

.sku-title {
  //font-weight: bold;
  font-size: 13px;
}

.empty-cart {
  padding: 80px 30px;

  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }

  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }

  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>
