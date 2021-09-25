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
// export const getGoodsSkuAPI = id => {
//   return request({
//     url: '/goods/sku/' + id,
//     method: 'get'
//   })
// }

// 同类推荐(也支持猜你喜欢)
export const getGoodsRelevantAPI = data => {
  return request({
    url: '/goods/relevant',
    method: 'get',
    data
  })
}

// 热销推荐
export const getGoodsHotAPI = data => {
  return request({
    url: '/goods/hot',
    method: 'get',
    data
  })
}
