import Vue from "vue";
import Vuex from "vuex";

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

import moduleA from './modules/moduleA.js'

Vue.use(Vuex);

// mutations getters 不关心定义在哪里 直接用就行
// 模块里的 commit 只能到自己模块的  mutations

const state = { // 保存共享状态，单一状态树
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: { // 划分模块 ，做不同的模块的数据吧保存
    a: moduleA
  },
});

export default store
