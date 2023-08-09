import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
import home from '@/views/layout/home.vue'
import category from '@/views/layout/category.vue'
import usercenter from '@/views/layout/usercenter.vue'
import cart from '@/views/layout/cart.vue'
import login from '@/views/login/Login.vue'
import pay from '@/views/pay/Pay.vue'
import myOrder from '@/views/order/MyOrder.vue'
import ProductDetail from '@/views/product/ProductDetail.vue'
import SearchList from '@/views/search/SearchList.vue'
import Search from '@/views/search/Search.vue'
import store from '@/store'
import useraddress from '@/views/addresses/useraddress.vue'
import useraddressedit from '@/views/addresses/useraddressedit.vue'
import UserCollect from '@/views/collect/UserCollect.vue'
import ProductComment from '@/views/order/ProductComment.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  base: '/',
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
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
        },
        {
          path: '/useraddress',
          component: useraddress
        },
        {
          path: '/useraddressedit',
          component: useraddressedit
        }
      ]
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/pay',
      component: pay
    },
    {
      path: '/order',
      component: myOrder
    },
    {
      path: '/prodetail/:productid',
      component: ProductDetail
    },
    {
      path: '/search_list',
      component: SearchList
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/usercollect',
      component: UserCollect
    },
    {
      path: '/productcomment',
      component: ProductComment
    }
  ]
})

const needLoginUrl = ['/pay', '/order']
router.beforeEach((to, from, next) => {
  // 判断路由路径是否在需要登录的路径数组中
  if (needLoginUrl.includes(to.path)) {
    // 是需要登录后才能访问的页面，则判断是否有token，没有token直接跳转到/login页面
    if (!store.state.user.userinfo.token) {
      next('/login')
    }
  }
  next()
})
export default router
