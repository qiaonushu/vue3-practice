import { getHeadCategoryAPI, getBrandAPI } from '@/api'
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
    // 头部分类弹窗列表
    async getClassify (store) {
      try {
        const { result } = await getHeadCategoryAPI()
        store.commit('setClassify', result)
      } catch (err) {
        console.error(err)
      }
    },
    // 品牌弹窗列表
    async getBrand () {
      try {
        const { result: res } = await getBrandAPI({ limit: 6 })
        return res
      } catch (err) {
        console.error(err)
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
