// 导入配置文件
import router from '@/router'
import store from '@/store'
import axios from 'axios'

// 配置基准路径
const baseURL = 'http://apipc-xiaotuxian-front.itheima.net/'

// 创建实例
const instance = axios.create({
  // 设置基准的接口请求路径
  baseURL: baseURL
  // 设置超出时间
  // timeout: 3000
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  const token = store.state.user.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  if (error.response && error.response.status === 401) {
    // token失效
    store.commmit('user/setToken', {})
    return router.push('/login')
  }
  return Promise.reject(error)
})

// 封装通用的调用后端接口的方法
export default (option) => {
  return instance({
    url: option.url,
    method: option.method,
    [option.method.toUpperCase() === 'GET' ? 'params' : 'data']: option.data
  })
}

// export default ({ url, method = 'GET', data, headers, params, is_Auto = true }) => {
//   return request({
//     url,
//     method,
//     data,
//     headers,
//     params,
//     is_Auto
//   })
// }
// export const createFormAPI = (url, method, data) => {
//   const config = {}
//   config.data = data
//   config.headers = {
//     'Cache-Control': 'no-cache',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
//   config.responseType = 'json'
//   config.transformRequest = [
//     function (data) {
//       let ret = ''
//       for (const it in data) {
//         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//       }
//       return ret
//     }
//   ]
//   return instance({
//     url,
//     method,
//     ...config
//   })
// }
