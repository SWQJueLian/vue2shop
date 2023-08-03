export default {
  namespaced: true,
  state: {
    userinfo: {
      token: '',
      userId: ''
    }
  },
  getters: {
    value: state => {
      return state.value
    }
  },
  mutations: {
    updateUserInfo (state, payload) {
      state.userinfo = payload
    }
  },
  actions: {
    updateValue ({ commit }, payload) {
      commit('updateValue', payload)
    }
  }
}
