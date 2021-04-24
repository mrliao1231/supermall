<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center><div>购物街</div></template>
    </nav-bar>

  <tab-control :titles="['流行','新款','精选']"
     @tabClick="tabClick"
     ref="tabControl1"
     class="tab-control" v-show="isTabFixed"/>

  <scroll class="content" ref="scroll" :probe-type="3"
  @scroll="contentScroll"
  :pull-up-load="true"
  @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control :titles="['流行','新款','精选']"
     @tabClick="tabClick"
     ref="tabControl2"/>

    <goods-list :goods="showGoods" />
  </scroll>

  <!-- 监听主键原生事件时 必须加上 .native -->
  <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import NavBar from "components/common/navbar/NavBar"
  import Scroll from "components/common/scroll/Scroll"

  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"

  import { getHomeMultidata,getHomeGoods } from "network/home"
  import { itemListenerMixin,backTopMixin } from 'common/mixin'


  export default {
    name:"Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },
    mixins: [itemListenerMixin,backTopMixin],
		data() {
			return {
				banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType:'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
			}
		},
    created() {
			// 1.请求多个数据
      this.getHomeMultidata();

      // 2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    methods: {
      // 事件监听

      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      // 网络请求
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //console.log(res)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          //console.log(res)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1
          // 上拉加载完成
          this.$refs.scroll.finishPullUp()
        })
      },
      // 监听滚动
      contentScroll(position) {
        //console.log(position) 返回顶部的显示隐藏
        this.isShowBackTop = (-position.y) > 1000
        // 决定 tabControl 是否吸顶(opsition: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      }


    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    // 活跃时
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)

      this.$refs.scroll.refresh()
    },
    // 不活跃时
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()

      // 取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;

  }

  .home-nav {
    background-color:var(--color-tint);
    color:white;

    /* 在使用浏览器原生滚动的时候使用
     position:fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index:999; */
  }


  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 999;
  }

 /* .content {
    height: calc(100% - 93px);
    margin-top: 44px;
  } */
</style>
