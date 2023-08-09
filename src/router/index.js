import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
import home from '@/views/layout/home.vue'
import category from '@/views/layout/category.vue'
import usercenter from '@/views/layout/usercenter.vue'
import cart from '@/views/layout/cart.vue'
import store from '@/store'

// 路由懒加载
const login = () => import('@/views/login/Login.vue')
const pay = () => import('@/views/pay/Pay.vue')
const myOrder = () => import('@/views/order/MyOrder.vue')
const ProductDetail = () => import('@/views/product/ProductDetail.vue')
const SearchList = () => import('@/views/search/SearchList.vue')
const Search = () => import('@/views/search/Search.vue')
const useraddress = () => import('@/views/addresses/useraddress.vue')
const useraddressedit = () => import('@/views/addresses/useraddressedit.vue')
const UserCollect = () => import('@/views/collect/UserCollect.vue')
const ProductComment = () => import('@/views/order/ProductComment.vue')
const ProductCommentDetail = () => import('@/views/order/ProductCommentDetail.vue')

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
    },
    {
      path: '/procomment-detail',
      component: ProductCommentDetail
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
