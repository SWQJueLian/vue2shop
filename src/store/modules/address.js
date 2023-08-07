import { getAddressList, getDefaultAddressID } from '@/apis/address'

export default {
  namespaced: true,
  state: {
    userAddressList: [], // 用户地址列表
    defaultAddressId: '' // 默认用户地址ID
  },
  getters: {
    // 获取用户默认地址ID
    defaultAddressId: state => {
      return state.defaultAddressId
    },
    // 获取用户地址列表
    userAddressList: state => {
      return state.userAddressList
    },
    // 获取用户默认的地址信息
    defaultAddress: state => {
      return state.userAddressList.find(item => item.address_id === state.defaultAddressId)
    }
  },
  mutations: {
    updateUserAddressList (state, payload) {
      state.userAddressList = payload
    },
    updateDefaultAddressId (state, payload) {
      state.defaultAddressId = payload
    }
  },
  actions: {
    // 获取用户地址列表
    async getUserAddressList (context, payload) {
      const { data: { list } } = await getAddressList()
      // 更新state中的值
      context.commit('updateUserAddressList', list)
    },
    // 获取默认的用户地址ID
    async getDefaultAddressId (context, payload) {
      const { data: { defaultId } } = await getDefaultAddressID()
      context.commit('updateDefaultAddressId', defaultId)
    },
    // 同时获取用户默认地址ID和用户地址列表
    async getUserAddressListAndDefaultID (context) {
      await context.dispatch('getUserAddressList')
      await context.dispatch('getDefaultAddressId')
    }
  }
}
