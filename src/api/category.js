import request from '@/utils/request'

// 一级类目
export const getFirstFilterAPI = data => {
  return request({
    url: '/category',
    method: 'get',
    data
  })
}

// 二级类目-筛选条件
export const getSubFilterAPI = data => {
  return request({
    url: '/category/sub/filter',
    method: 'get',
    data
  })
}

// 商品列表
export const postCategorystGoodsAPI = (data) => {
  return request({
    url: '/category/goods/temporary',
    method: 'post',
    data
  })
}
