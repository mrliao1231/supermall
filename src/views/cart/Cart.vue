<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center><div>购物车({{cartLength}})</div></template>
    </nav-bar>
    
    <cart-list/>
    
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  import CartList from "./childComps/CartList"
  import CartBottomBar from "./childComps/CartBottomBar"

  import { mapGetters } from 'vuex'

  export default {
    name:"Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // 给 getters 取另一个名称  传入对象  ...mapGetters({length: 'cartLength'})
      ...mapGetters(['cartLength'])
    }


  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff
  }
</style>
