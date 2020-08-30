<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <div>
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommends"></goods-list>
      </div>
    </scroll>
    <detail-bottom-bar @addToCart="addInCart"></detail-bottom-bar>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailSwiper from "./childComps/DetailSwiper";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "components/common/toast/Toast"

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      message: '',
      show: false
    };
  },
  created() {
    //1. 保存传入的iid
    this.iid = this.$route.params.iid;

    //2. 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      //1. 获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages;

      //2. 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3. 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      //4. 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5. 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.获取评论信息
      if (data.rate.cRate !== 0) this.commentInfo = data.rate.list[0];
    });

    //3. 请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    //4. 给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

    }, 110);
  },
  methods: {
    ...mapActions(['addCart']),

    addInCart(){
      //1. 获取购物车需要展示的数据
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      //2.将商品添加到购物车里
      this.addCart(product).then(res => {
        // this.show=true;
        // this.message = res

        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1500);

        this.$toast.show(res, 1500)
      })
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]);
    },
    contentScroll(position) {
      this.yListener(position)
      //1. 获取Y值
      const positionY = -position.y;

      let length =this.themeTopYs.length
      //2. 对比positionY和主题中的值
      for (let i=0;i<length; i++) {
        if (this.currentIndex != i && (
          (i<length-1 && positionY >= this.themeTopYs[i] && positionY< this.themeTopYs[i+1]) || (i===length-1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex=i
          this.$refs.nav.currentIndex= this.currentIndex
        }
      }
    },

  },
  mounted() {},
  updated() {},
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.content {
  width: 100%;
  position: absolute;
  top: 44px;
  bottom: 60px;
}
.detail-nav {
  position: relative;
  z-index: 9;
}
</style>
