// 商品相关api

import request from '@/utils/request'

export const getProductDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
