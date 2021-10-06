import request from '@/utils/request'
import { commentURL } from '@/utils/config'

// 商品详情
export const getGoodsAPI = data => {
  return request({
    url: '/goods',
    method: 'get',
    data
  })
}

// 商品的评价信息
export const getGoodsEvaluateAPI = id => {
  return request({
    url: `${commentURL}goods/${id}/evaluate`,
    method: 'get'
  })
}

// 评价分页数据
export const getGoodsPageAPI = data => {
  return request({
    url: `${commentURL}goods/${data.id}/evaluate/page`,
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
