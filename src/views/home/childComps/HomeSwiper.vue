<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
//通过封装好的home.js将要导出的文件导入,直接导入文件夹路径
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad:false
    }
  },
  components: { Swiper, SwiperItem },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad=true
      }
    }
  }
};
</script>

<style scoped>
</style>
