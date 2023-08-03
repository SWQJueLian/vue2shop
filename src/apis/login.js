// 登录请求的所有api都放在此文件中

import request from '@/utils/request'

// 获取图形验证码
const getCode = () => {
  return request.get('/captcha/image')
}

export { getCode }
