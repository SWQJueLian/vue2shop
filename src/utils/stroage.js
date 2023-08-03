/**
 * 此处存放存储相关方法
 */

// 定义用户信息KEY
const USERINFO_KEY = 'shop_userinfo'

export const saveUserInfo = (userinfo) => {
  localStorage.setItem(USERINFO_KEY, JSON.stringify(userinfo))
}

export const getUserInfo = () => {
  const userinfo = localStorage.getItem(USERINFO_KEY)
  // 如果localstorage中拿出来的是空，就不能丢去JSON中反序列化，此时返回空对象即可。
  return userinfo ? JSON.parse(userinfo) : { token: '', userId: '' }
}

export const delUserInfo = () => {
  localStorage.removeItem(USERINFO_KEY)
}
