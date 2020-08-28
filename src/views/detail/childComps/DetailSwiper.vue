<template>
    <swiper class="detai-swiper">
      <swiper-item class="item" v-for="item in topImages" :key="item.index">
       <img :src="item" alt="" @load="listMe">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "DetailSwiper",
  components:{Swiper, SwiperItem},
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    listMe(){
      // console.log("图片加载完成");
    }
  }
};
</script>

<style scoped>
.item {
    text-align: center;
    height: 300px;
  }
</style>
