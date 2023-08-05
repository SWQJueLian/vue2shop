import { getUserInfo, saveUserInfo } from '@/utils/stroage'

export default {
  namespaced: true,
  state: {
    userinfo: getUserInfo() // 先从localstorage中取。
  },
  getters: {
    // 直接获取是否登录（以token是否为空来判断）
    isLogin: state => {
      return state.userinfo.token !== ''
    },
    userinfo: state => {
      return state.userinfo
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
