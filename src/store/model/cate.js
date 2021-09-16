// 首页模块
import { getHeadCategoryAPI, getBannerAPI } from '@/api'
import { category } from '@/utils/constant'

export default {
  namespaced: true,
  state () {
    return {
      classify: category.map((item, index) => ({ id: index, name: item }))
    }
  },
  mutations: {
    setClassify (state, val) {
      state.classify = val
    }
  },
  actions: {
    // 首页-Layout头部分类弹窗列表
    async getClassify (store) {
      try {
        const { result } = await getHeadCategoryAPI()
        store.commit('setClassify', result)
      } catch (err) {
        console.error(err)
      }
    },
    // 首页-轮播图
    async getBanner () {
      try {
        const { result: res } = await getBannerAPI()
        return Promise.resolve(res) // 返回成功的Promise对象
      } catch (err) {
        console.error(err)
        return Promise.reject(err) // 返回失败的Promise对象
      }
    }
  },
  getters: {
    cateClassify (state) {
      return state.classify.map(item => {
        return {
          ...item,
          children: item.children && item.children.filter((item, i) => i < 2)
        }
      })
    }
  }
}
