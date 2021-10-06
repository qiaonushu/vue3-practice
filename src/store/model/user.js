import { postLoginAPI, postLoginCodeAPI, postLoginSocialAPI } from '@/api'

export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      },
      // 三方登录标识
      unionId: ''
    }
  },
  mutations: {
    // 修改用户信息，payload就是用户信息对象
    setUser (state, payload) {
      state.profile = payload
    },
    setunionId (state, Id) {
      state.unionId = Id
    }
  },
  actions: {
    async postLogin (store, { account, password, mobile, code }) {
      if (mobile) {
        const res = await postLoginCodeAPI({ mobile, code })
        store.commit('setUser', res.result)
        return res
      } else {
        const res = await postLoginAPI({ account, password })
        store.commit('setUser', res.result)
        return res
      }
    },
    async postSocial (store) {
      // 获取用户信息
      await window.QC.Login.getMe(res => {
        store.commit('setunionId', res)
      })
      try {
        const { result } = await postLoginSocialAPI({ unionId: store.state.unionId })
        store.commit('setUser', result)
        return result
      } catch (err) {
        return err
      }
    }
  }
}
