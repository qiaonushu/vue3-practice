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

// 首页-广告区域
export const getBannerAPI = () => {
  return request({
    url: '/home/banner',
    method: 'get'
  })
}

// 首页-新鲜好物
export const getNewAPI = data => {
  return request({
    url: '/home/new',
    method: 'get',
    data
  })
}

// 首页-人气推荐
export const getHotAPI = () => {
  return request({
    url: '/home/hot',
    method: 'get'
  })
}

// 首页-产品区块
export const getGoodsAPI = () => {
  return request({
    url: '/home/goods',
    method: 'get'
  })
}

// 首页-最新专题
export const getSpecialAPI = data => {
  return request({
    url: '/home/special',
    method: 'get',
    data
  })
}
