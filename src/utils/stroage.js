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
  return userinfo
    ? JSON.parse(userinfo)
    : {
        token: '',
        userId: ''
      }
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

// 底部状态条高亮index
export const getActiveBar = () => {
  return localStorage.getItem('active') || 'home'
}

export const setAcitveBar = (newValue) => {
  localStorage.setItem('active', newValue)
}

const CART_CHECKED_STATUS = 'shop_cart_checked_status'
// 获取选中ID列表
export const getSKUCheckStatus = () => {
  return localStorage.getItem(CART_CHECKED_STATUS) || []
}
// 保存购物车选中状态（后端竟然不给是否选中....）
export const updateSKUCheckStatus = (skuID, isAdd) => {
  const status = localStorage.getItem(CART_CHECKED_STATUS)
  // 转为集合
  const obj = new Set(status ? JSON.parse(status) : [])
  if (isAdd) {
    // 添加id进去
    obj.add(skuID)
  } else {
    obj.delete(skuID)
  }
  console.log(obj)
  // 转回数组存储在localstorage
  localStorage.setItem(CART_CHECKED_STATUS, JSON.stringify([...obj]))
}

export const setSKUCheckStatus = (skuIDs) => {
  // 转回数组存储在localstorage
  localStorage.setItem(CART_CHECKED_STATUS, JSON.stringify(skuIDs))
}

export const deleteSKUCheckStatus = () => {
  localStorage.removeItem(CART_CHECKED_STATUS)
}

// 用户收藏商品（本地保存，因为后端没有接口，纯粹练习）
const COLLECT_KEY = 'shop_collect_list'

export const getCollectList = () => {
  const list = localStorage.getItem(COLLECT_KEY)
  return list ? JSON.parse(list) : []
}

// 设置用户收藏列表
export const setCollectList = (list) => {
  localStorage.setItem(COLLECT_KEY, JSON.stringify(list))
}
