<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街{{test22}}</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

import { debounce } from "common/utils";
import {itemListenerMixin} from "common/mixin"
export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
  },
  mixins:[itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      test22: "哇塞",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,

    };
  },
  destroyed() {
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1. 保存Y值
    this.saveY = this.$refs.scroll.getScrollY();

    // 2. 取消全局事件的监听
    this.$bus.$off("itemImageLoad");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  created() {
    this.getMultidata();
    this.getHomeProducts("pop");
    this.getHomeProducts("new");
    this.getHomeProducts("sell");
  },
  mounted() {
    // const newRefresh = debounce(this.$refs.scroll.refresh, 100);

    // //3.监听item中图片加载完成
    // this.itemImageListener = () => {
    //   newRefresh();
    // };
    // this.$bus.$on("itemImageLoad",this.itemImageListener);
  },
  methods: {
    /* 事件监听相关方法 */

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      // 判断backTop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 决定tabControl是否吸顶（position：fixed
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    loadMore() {
      this.getHomeProducts(this.currentType);
    },

    swiperImageLoad() {
      //获取tabControl的offsetTop
      //所有的组件都有一个属性$el,用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /* 网络请求相关方法 */
    //1.请求多个数据
    getMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //2.请求商品数据
    getHomeProducts(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },

    //监听返回顶部按钮
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  /* position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9; */
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
  z-index: 9;
}
</style>
