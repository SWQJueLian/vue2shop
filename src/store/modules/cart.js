import { deleteCartItem, getCartList, updateCartItem } from '@/apis/cart'

export default {
  namespaced: true,
  state: {
    cartList: [] // 购物车信息
  },
  getters: {
    // 返回购物车
    cartList: state => {
      return state.cartList
    },
    // 返回购物车长度数量
    cartLength: state => {
      return state.cartList.length
    },
    // 返回选中的商品总数（商品*购买数量）
    cartChoieNum: state => {
      return state.cartList.reduce((sum, item) => {
        if (item.isChecked) {
          return sum + item.goods_num
        }
        return sum
      }, 0)
    },
    // 返回选中商品总价
    totalPrice: state => {
      return state.cartList.reduce((sum, item) => {
        if (item.isChecked) {
          return sum + item.goods_num * item.goods.goods_price_min
        }
        return sum
      }, 0).toFixed(2) // 统一保留2位小数
    },
    // 返回购物车所有商品是否都选中
    isAllChecked: state => {
      return state.cartList.every(item => item.isChecked)
    },
    // 返回被选中的SKU ID数组
    choiceSKUIDs: state => {
      const ids = []
      state.cartList.forEach(item => {
        if (item.isChecked) {
          ids.push(item.id)
        }
      })
      return ids
    }
  },
  mutations: {
    // 设置购物车
    setCartList (state, payload) {
      state.cartList = payload
    },
    // 全选/全不选
    checkAll (state, check) {
      state.cartList.forEach(item => {
        item.isChecked = check
      })
    },
    // 更新SKU的购买数量
    changeSKUCountUCount (state, payload) {
      const sku = state.cartList.find(item => item.goods_id === payload.goods_id)
      sku.goods_num = payload.goods_num
    },
    // 删除购物车中的某个SKU
    deleteCartItem (state, ids) {
      console.log(ids, 'fuck....')
      // 只要不在删除的数组中就保留
      state.cartList = state.cartList.filter(item => !ids.includes(item.id)) // 删除的购物车ID，不是goods_id
    }
  },
  actions: {
    async getCartList ({ commit }) {
      // 获取购物车列表，并设置state中的数据
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.isChecked = true
      })
      // 因为返回的数据没有是否勾选状态flag，所以手工为每一项添加一个标志位
      commit('setCartList', data.list)
    },
    async changeSKUCount (context, obj) {
      // 修改vuex中的数据
      context.commit('changeSKUCountUCount', obj)
      // 发送请求到后台服务器中修改数据
      const resp = await updateCartItem(obj.goods_id, obj.goods_num, obj.goods_sku_id)
      console.log('修改商品数量:', resp)
    },
    async deleteCartItem ({ commit }, ids) {
      // 需要传递一个删除的SKU数组
      console.log(ids, 'ids现在的值')
      const resp = await deleteCartItem(ids)
      console.log(resp, '删除购物车商品返回结果')
      commit('deleteCartItem', ids)
    }
  }
}
