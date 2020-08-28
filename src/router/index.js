import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Menu = () => import('../views/menu/Menu.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail =() => import('../views/detail/Detail.vue')

//1. 安装插件
Vue.use(VueRouter)

//2.创建路由对象
const routes = [{
  path: '',
  redirect: 'home'
}, {
  path: '/cart',
  component: Cart
}, {
  path: '/menu',
  component: Menu
}, {
  path: '/profile',
  component: Profile
}, {
  path: '/home',
  component: Home
},
{
  path: '/detail/:iid',
  component: Detail
},
]

const router =new VueRouter({
  routes,
  mode : 'history'
})

export default router
