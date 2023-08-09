export default {
  namespaced: true,
  state: {
    commentGoods: {}
  },
  getters: {
    commentGoods: state => {
      return state.commentGoods
    }
  },
  mutations: {
    setCommentGoods (state, payload) {
      state.commentGoods = payload
    }
  }
}
