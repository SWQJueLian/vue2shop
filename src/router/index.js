import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
import home from '@/views/layout/home.vue'
import category from '@/views/layout/category.vue'
import usercenter from '@/views/layout/usercenter.vue'
import cart from '@/views/layout/cart.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
  base: '/', // mode: 'history',
  routes: [{
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/home',
      component: home
    }, {
      path: '/category',
      component: category
    }, {
      path: '/user',
      component: usercenter
    }, {
      path: '/cart',
      component: cart
    }]
  }]
})
