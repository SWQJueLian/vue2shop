import { getCollectList } from '@/utils/stroage'

export default {
  namespaced: true,
  state: {
    collectList: getCollectList() // 收藏商品列表，数据存储在本地。
  },
  getters: {
    // 收藏列表长度
    collectListLength: state => {
      return state.collectList.length
    }
  },
  mutations: {
    // 添加SKU到收藏列表
    addSKUToCollectList (state, payload) {
      const index = state.collectList.findIndex(item => item.goods_id === payload.goods_id)
      // 找到相同的，则删除掉,才能再添加到首部
      if (index !== -1) {
        console.log('找到相同的收藏项，先删除再添加到头部')
        state.collectList.splice(index, 1)
      }
      state.collectList.unshift(payload) // 添加到头部
    },
    // 删除用户收藏中的指定商品
    deleteCollect (state, payload) {
      state.collectList = state.collectList.filter(item => item.goods_id !== payload)
    }
  }
}
