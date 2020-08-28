<template>
  <nav-bar class="detail-nav">
    <div slot="left" class="back">
      <img src="~assets/img/common/back.svg" alt @click="backClick" />
    </div>
    <div slot="center" class="title">
      <span
        v-for="(item, index) in titles"
        class="title-item"
        :key="index"
        :class="{'active': index===currentIndex}"
        @click="tabClick(index)"
      >{{item}}</span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: { NavBar },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.detail-nav {
  background-color: #ffffff;
  font-weight: normal;
}
.title {
  display: flex;
  font-size: 13px;
  padding: 0 20px;
}

.title-item {
  flex: 1;
}

.title-item.active {
  color: var(--color-high-text);
}

.back {
  margin-top: 10px;
}
</style>
