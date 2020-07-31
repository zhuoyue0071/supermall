<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
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
  mounted() {
    //1. 创建better-scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: 3
    });

    //2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
      console.log(position);
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style>
</style>
