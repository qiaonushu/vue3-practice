import { postMemberCartAPI, getMemberCartAPI, deleteMemberCartAPI } from '@/api'

// 购物车状态
export default {
  namespaced: true,
  state: () => {
    return {
      list: []
    }
  },
  mutations: {
    addList (state, option) {
      const repeat = state.list.some(item => {
        if (item.sku.id === option.sku.id) {
          item.num += option.num
          return true
        }
      })
      if (!repeat) {
        state.list.push(option)
      }
    },
    setList (state, val) {
      state.list = val
    },
    delItems (state, val) {
      val.forEach(item => {
        state.list.some((i, index) => {
          if (item === i.skuId) {
            state.list.splice(index, 1)
          }
        })
      })
    }
  },
  actions: {
    // 添加商品
    async postMemberCart (store, data) {
      // 用户是否登录
      if (store.rootState.user.profile.token) {
        // 登录调用添加接口
        const res = await postMemberCartAPI({ skuId: data.skuid, count: data.num })
        // store.commit('setList', res)
        console.log(res)
      } else {
        // 没有就调用添加的方法
        store.commit('addList', data)
      }
    },
    // 获取购物车列表
    async getMemberCart (store) {
      // 用户是否登录
      if (store.rootState.user.profile.token) {
        // 登陆获取用户的购物车信息
        const { result } = await getMemberCartAPI()
        store.commit('setList', result)
      } else {
        // 没登陆清空list数据
        store.commit('setList', [])
      }
    },
    // 删除商品
    async delMemberCart (store, { ids, clearAll = false, clearInvalid = false }) {
      if (store.rootState.user.profile.token) {
        const res = await deleteMemberCartAPI({ ids, clearAll, clearInvalid })
        console.log(res)
      } else {
        if (clearAll) store.commit('setList', [])
        if (clearInvalid) store.commit('delItems', ids)
        store.commit('delItems', ids)
      }
    }
  }
}
