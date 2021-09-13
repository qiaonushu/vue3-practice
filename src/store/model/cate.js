import { getHeadCategoryAPI } from '@/api'
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
    async getClassify (store) {
      const { result } = await getHeadCategoryAPI()
      store.commit('setClassify', result)
    }
  },
  getters: {
    cateClassify (state) {
      return state.classify.map(item => {
        return {
          ...item,
          children: item.children && item.children.filter((i, index) => index < 2)
        }
      })
    }
  }
}
