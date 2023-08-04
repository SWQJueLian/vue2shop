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

// 搜索相关存储方法

const SEARCH_KEY = 'shop_search_history'

// 获取搜索历史
export const getSearchHistory = () => {
  const history = localStorage.getItem(SEARCH_KEY)
  return history ? JSON.parse(history) : []
}

// 设置搜索历史
export const setSearchHistory = (history) => {
  localStorage.setItem(SEARCH_KEY, JSON.stringify(history))
}
