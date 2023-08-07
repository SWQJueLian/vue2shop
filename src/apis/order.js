// 订单结算相关api

import request from '@/utils/request'

export const checkoutOrder = (queryParam) => {
  /**
   * 下单有两种途径：
   * (1). 通过购物车下单
   * (2). 通过商品详情页中的 “立即购买” 按钮快捷下单
   */
  return request.get('/checkout/order', {
    params: {
      ...queryParam, // 将两种不同途经下单的方式放到对象中，然后拆包赋值即可兼容两种下单方式。
      // mode: mode, // 商品id (购物车下单需传递cart, 商品详情页立即购买下单需要传递buynow)
      delivery: 10, // 快递方式
      couponId: 0, // 优惠卷ID
      isUsePoints: 0 // 是否使用积分
      // goodsId: '10038', // 商品id (购物车下单无需传递, 商品详情页立即购买需要传递商品id)
      // goodsNum: '1', // 商品数量(购物车下单无需传递, 商品详情页立即购买需要传递)
      // goodsSkuId: '0', // 默认值(购物车下单无需传递, 商品详情页立即购买需要传递)
      // 购物车id用","符号分割
      // cartIds: "id, id, ..." // 购物车id (购物车下单需传递, 商品详情页立即购买下单不需要传递)
    }
  })
}
