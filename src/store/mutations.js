import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'
                  //  每个方法实现的效果尽量单一
export default { // 方法  mutations 唯一的目的就是修改 state 中的状态
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
		payload.checked = true
    state.cartList.push(payload)
  }
}
