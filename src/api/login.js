import request from '@/utils/request'

// 登录-用户名和密码
export const postLoginAPI = data => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取短信验证码-登录-PC
export const getLoginCodeAPI = data => {
  return request({
    url: '/login/code',
    method: 'get',
    data
  })
}

// 手机验证码登录
export const postLoginCodeAPI = data => {
  return request({
    url: '/login/code',
    method: 'post',
    data
  })
}

// 注册-校验用户名唯一
export const getRegisterCheckAPI = data => {
  return request({
    url: '/register/check',
    method: 'get',
    data
  })
}

// 注册-PC/app
export const postRegisterAPI = data => {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

// 获取短信验证码-注册-PC
export const getRegisterCodeAPI = data => {
  return request({
    url: '/register/code',
    method: 'get',
    data
  })
}

// 三方登录
export const postLoginSocialAPI = ({ unionId, source = 6 }) => {
  return request({
    url: '/login/social',
    method: 'post',
    data: { unionId, source }
  })
}

// 三方登录_发送已有账号短信
export const getLoginSocialCodeAPI = ({ mobile, unionId, source = 1 }) => {
  return request({
    url: '/login/social/code',
    method: 'get',
    data: { mobile, unionId, source }
  })
}

// 三方登录_账号绑定
export const postLoginSocialBindAPI = data => {
  return request({
    url: '/login/social/bind',
    method: 'get',
    data
  })
}

// 三方登录-完善信息
export const postLoginComplementAPI = data => {
  return request({
    url: `/login/social/${data.unionId}/complement`,
    method: 'post',
    data
  })
}
