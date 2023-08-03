// 登录请求的所有api都放在此文件中

import request from '@/utils/request'

// 获取图形验证码
export const getCode = () => {
  return request.get('/captcha/image')
}

export const getSMSCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      /**
       * 图形验证码
       */
      captchaCode,
      /**
       * 图形验证码key
       */
      captchaKey,
      /**
       * 接收验证码手机
       */
      mobile
    }
  })
}
