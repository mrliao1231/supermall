<template>
  <div class="check-button" :class="{check: isChecked}" >
    <img src="~assets/img/cart/tick.svg" alt="" v-show="isChecked">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked:{
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
    width: 20px;
    height: 20px;
  }

  .check-button img {
    width: 100%;
    height: 100%;
  }

  .check {
    border-color: red;
    background-color: red;
  }
</style>
