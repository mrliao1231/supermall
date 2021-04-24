import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default { // 异步操作  还有其他 复杂的操作
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload  是新添加的商品 item 就是 cartList 的遍历项
      let oldProuct = context.state.cartList.find(item => item.iid === payload.iid)

      // 判断 oldProduct
      if (oldProuct) {
        //oldProuct.count += 1
        context.commit(ADD_COUNTER, oldProuct)
        resolve('当前商品数量 +1')
      } else {
        payload.count = 1
        //state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加商品到购物车')
      }
      reject('404')
    })
  }
}
