import request from '@/utils/request'

// 获取用户的地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}

// 获取默认收获地址ID，太狗血了吧...就不能来一个获取默认收获地址,....
export const getDefaultAddressID = () => {
  return request.get('/address/defaultId')
}
