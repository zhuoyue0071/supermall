<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot><button class="clickOnMe" @click="clickMe">点我</button></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type:Boolean,
      default:false
    }
  },
  mounted() {
    //1. 创建better-scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    //2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      this.$emit('scroll', position)
    })

    //3. 监听上拉事件
    this.scroll.on("pullingUp",() => {
     this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      setTimeout(() => {
      this.scroll.finishPullUp()
      }, 4000);
    },
    clickMe(){
      console.log('ssssss')
    }
  },
};
</script>

<style>
.clickOnMe{
  z-index: 10;
}
</style>
