import request from '@/utils/request'

// 获取个人信息
export const getUserInfo = () => {
  return request.get('/user/info')
}
