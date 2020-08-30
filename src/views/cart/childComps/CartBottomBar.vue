<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick" />
      <span>全选</span>
    </div>

    <div class="price">合计: {{totalPrice}}</div>

    <div class="calculate" @click="calcClick" :class="{isHighLight:isCool}">去计算: ({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),

    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },

    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },

    isSelectAll() {
      return this.cartList.length === 0
        ? !this.cartList.length === 0
        : !this.cartList.find((item) => !item.checked);
    },

    isCool() {
      if(this.checkLength!=0){
        return true
      }
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((element) => (element.checked = false));
      } else {
        this.cartList.forEach((element) => (element.checked = true));
      }
    },
    calcClick(){
      if(!(this.cartList.find((item) => item.checked)))
      this.$toast.show('请选择购买的商品', 2000)
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  background-color: rgb(255, 255, 255);
  line-height: 40px;
  align-items: center;
  border-top: .1px solid rgb(214, 214, 214);
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 0px;
  width: 70px;
  line-height: 23.5px;
  font-weight: bold;
  font-family: "黑体";
}

.check-button {
  margin: 5px 5px;
  height: 22px;
  width: 22px;
}

.price {
  flex: 1;
  color: rgb(248, 140, 190);
  line-height: 37px;
  font-weight: bold;
  text-align: center;
  text-indent:45px;
}

.calculate {
  width: 100px;
  background: rgb(160, 159, 159);
  color: #ffffff;
  text-align: center;
  line-height: 39px;
}

  .isHighLight{
    background: rgb(240, 110, 110);
  }
</style>
