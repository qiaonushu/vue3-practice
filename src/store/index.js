import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import cart from './model/cart'
import user from './model/user'
import cate from './model/cate'
import global from './model/global'

export default createStore({
  ...global,
  modules: {
    user,
    cart,
    cate
  },
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']
    })
  ]
})
