import request from '@/utils/request'

// 购物车列表
export const getMemberCartAPI = () => {
  return request({
    url: '/member/cart',
    method: 'get'
  })
}

// 加入购物车
export const postMemberCartAPI = data => {
  return request({
    url: '/member/cart',
    method: 'post',
    data
  })
}

// 删除/清空购物车商品
export const deleteMemberCartAPI = data => {
  return request({
    url: '/member/cart',
    method: 'delete',
    data
  })
}

// 合并购物车
export const postCartMergeAPI = data => {
  return request({
    url: '/member/cart/merge',
    method: 'post',
    data
  })
}

// 购物车全选/取消全选
export const putCartSelected = data => {
  return request({
    url: '/member/cart/selected',
    method: 'put',
    data
  })
}

// 修改购物车商品
export const putMemberCart = data => {
  return request({
    url: `/member/cart/${data.id}`,
    method: 'put',
    data
  })
}
