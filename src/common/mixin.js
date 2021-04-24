import { debounce } from './utils'
import BackTop from "components/content/backTop/BackTop"

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 监听 item 中图片的加载
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    // 对监听事件进行保存
    this.itemImgListener = () => {refresh()}
    this.$bus.$on("itemImageLoad", this.itemImgListener)
    // console.log('我是混入中的内容')
    // 获取 tabControl 的 offsetTop
    // 所有组件都有一个属性 $el: 用于获取组件中的元素
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods:  {
     backClick() {
       this.$refs.scroll.scrollTo(0,0)
     }
  }
}
