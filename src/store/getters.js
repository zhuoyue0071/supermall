export default {
  cartLength(state) {
    return state.cartList.length || 0
  },
  cartList(state) {
    return state.cartList
  }
}
