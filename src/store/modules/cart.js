export default {
  namespaced: true,
  state: {
    cartTotal: 0
  },
  getters: {
    cartTotal: state => {
      return state.cartTotal
    }
  },
  mutations: {
    updateCartTotal (state, payload) {
      state.cartTotal = payload
    }
  },
  actions: {
    updateCartTotal ({ commit }, payload) {
      commit('updateCartTotal', payload)
    }
  }
}
