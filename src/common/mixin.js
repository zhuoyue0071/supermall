import {debounce } from "./utils"
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
  data(){
    return {
      itemImageListener: null,
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.$bus.$on('itemImgLoad', () => {
      newRefresh()
    })
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components:{ BackTop },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    yListener(position){
      this.isShowBackTop = -position.y > 1000;
    }
  }
}
