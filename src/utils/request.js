import axios from 'axios'

// 请求基础url
const baseurl = 'http://cba.itlike.com/public/index.php?s=/api/'

// axios实例
const axiosInstance = axios.create({
  baseURL: baseurl,
  timeout: 5000
})

// 添加拦截器
// 添加请求拦截器
axiosInstance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axiosInstance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data // (axios会多包装一层data，提前在响应前拦截并返回，减少后面需要resp.data.data之类的调用...)
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出默认
export default axiosInstance
