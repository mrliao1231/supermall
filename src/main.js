import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from "components/common/toast"

Vue.config.productionTip = false;

// 添加事件总线
Vue.prototype.$bus= new Vue()
// 安装 toast 插件
Vue.use(toast)
// 解决移动端 300ms 点击延迟
FastClick.attach(document.body)

// 使用 懒加载的插件  第二个参数是一个对象，配置一些懒加载的东西
Vue.use(VueLazyLoad)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
