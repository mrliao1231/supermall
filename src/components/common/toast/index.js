import Toast from './Toast'

const obj = {}

// 默认会传 一个 Vue对象 过来
obj.install = function (Vue) {
  // 1. 创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // 2. new 的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 3. 将组件对象，手动挂在到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4. toast.$el 对应的就是 div   往  body 上添加一个 dom 节点
  document.body.appendChild(toast.$el)

  // 往 Vue 的原型上添加
  Vue.prototype.$toast = toast
}

export default obj
