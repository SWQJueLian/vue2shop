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
