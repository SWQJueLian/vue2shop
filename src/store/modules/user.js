import { getUserInfo, saveUserInfo } from '@/utils/stroage'

export default {
  namespaced: true,
  state: {
    userinfo: getUserInfo() // 先从localstorage中取。
  },
  getters: {
    value: state => {
      return state.value
    }
  },
  mutations: {
    updateUserInfo (state, payload) {
      state.userinfo = payload
      saveUserInfo(payload)
    }
  },
  actions: {
    updateValue ({ commit }, payload) {
      commit('updateValue', payload)
    }
  }
}
