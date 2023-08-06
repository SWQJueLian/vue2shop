// 存放购物车相关api

import request from '@/utils/request'

// 添加商品SKU到购物车中
export const addSkuToCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车商品列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 购物车商品更新
export const updateCartItem = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车SKU
export const deleteCartItem = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
