<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>

  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton"

  import { mapGetters } from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { //  全部选中
          this.cartList.forEach(item => item.checked = false)
        } else { // 有部分或全部 不选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品')
        }
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
          //  preValue 是 前面数的 和
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false
        // 找到没选中的   如果有 没选中的商品
        // return !(this.cartList.filter(item => !item.checked).length)
        return !this.cartList.find(item => !item.checked)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    line-height: 40px;
    height: 40px;
    background-color: #eee;
    position: relative;
    display: flex;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    line-height: 20px;
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    text-align: center;
    background-color: orangered;
    color: white;
  }
</style>
