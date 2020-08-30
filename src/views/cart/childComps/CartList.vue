<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in list" :key="index" :item-info="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cartList",
    }),
  },
  components: { Scroll, CartListItem },
  mounted() {},
  methods: {},
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.content {
  height: 100%;
  overflow: hidden;
}
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
</style>
