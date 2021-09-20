import request from '@/utils/request'

// 商品详情
export const getGoodsAPI = data => {
  return request({
    url: '/goods',
    method: 'get',
    data
  })
}

// 商品信息-sku
