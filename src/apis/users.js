import request from '@/utils/request'

// 获取个人信息
export const getUserInfo = () => {
  return request.get('/user/info')
}

// 获取用户的商品状态数量
// 玛德，这接口返回的数量不对的...有毒啊、、、草！
export const getOrderTodoCount = () => {
  return request.get('/order/todoCounts')
}
