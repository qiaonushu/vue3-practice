export default {
  state: {},
  mutations: {},
  actions: {},
  getters: {
    cartNum (state) {
      return state.cart.list.length
    },
    shopping (state) {
      return state.cart.list.reduce((sum, item) => {
        if (item.selected) {
          sum.num += item.count
          sum.totalPrice += item.count * item.nowPrice
        }
        return sum
      }, { num: 0, totalPrice: 0 })
      // const shop = state.cart.list.reduce((sum, item) => {
      //   sum.num += item.num
      //   sum.totalPrice += item.num * item.price.replace('.', '')
      //   return sum
      // }, { num: 0, totalPrice: 0 })
      // shop.totalPrice = shop.totalPrice.toString()
      // shop.totalPrice = shop.totalPrice.slice(0, shop.totalPrice.length - 2) + '.' + shop.totalPrice.slice(shop.totalPrice.length - 2)
      // return shop
    },
    effective (state) {
      return state.cart.list.filter(item => item.isEffective === true)
    },
    invalid (state) {
      return state.cart.list.filter(item => item.isEffective === false)
    },
    selectAll (state) {
      return state.cart.list.every(item => item.selected)
    }
  }
}
