// 商品相关api

import request from '@/utils/request'

export const getProductDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 获取商品评价
export const getProComments = (goodsId, scoreType, page) => {
  return request.get('/comment/list', {
    params: {
      goodsId,
      scoreType,
      page
    }
  })
}

// 获取评价总数
export const getProCommentsCount = (goodsId) => {
  return request.get('/comment/total', {
    params: {
      goodsId
    }
  })
}

// 商品评价
export const submitComment = (orderId, objArr) => {
  return request.post('/order.comment/submit', {
    orderId,
    form: objArr
  })
}

// 上传评价图片
export const uploadImage = (fileObj) => {
  const fromData = new FormData()
  fromData.append('file', fileObj)
  return request.post('/upload/image', fromData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
