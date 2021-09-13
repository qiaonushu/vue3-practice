import request from '@/utils/request'

// 首页-头部分类-PC
export const getHeadCategoryAPI = () => {
  return request({
    url: '/home/category/head',
    method: 'get'
  })
}

// 首页-热门品牌
export const getBrandAPI = data => {
  return request({
    url: '/home/brand',
    method: 'get',
    data
  })
}
