import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import cart from '@/store/modules/cart'
import address from '@/store/modules/address'
import collect from '@/store/modules/collect'
import comment from '@/store/modules/comment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user, cart, address, collect, comment
  }
})
