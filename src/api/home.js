import request from '@/utils/request'

// 首页-头部分类-PC
export const getHeadCategoryAPI = () => {
  return request({
    url: '/home/category/head',
    method: 'get'
  })
}
