import Vue from 'vue'
import Vuex from 'vuex'

//1. 安装插件
Vue.use(Vuex)

//2. 创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    //mutations唯一的目的就是修改state中状态
    //mutations中的每个方法尽可能完成的事件比较单一一点
    addCounter(state, payload){
      payload.count++
    },
    addToCart(state, payload){
      state.cartList.push(payload)
    }
    },
    actions: {
      addCart(context, payload) {
        //payload新添加的商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
          if(oldProduct) {
            // oldProduct.count +=1
            context.commit('addCounter', oldProduct)
          }else{
            payload.count = 1
            // context.state.cartList.push(payload)
            context.commit('addToCart', payload)
          }
        }
    }
})

//3. 挂载Vue实例上
export default store
