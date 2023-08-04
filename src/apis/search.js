// 搜索相关api

import request from '@/utils/request'

export const getSearchKeyProductList = (paramsObj) => {
  // const { categoryId, goodsName, page } = paramsObj
  return request.get('/goods/list', {
    params: paramsObj
  })
}
