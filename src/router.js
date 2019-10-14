import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home/Home.vue'
import Member from './components/Member/Member.vue'
import ShopCar from './components/ShopCar/ShopCar.vue'
import GoodsInfo from './components/GoodsList/GoodsInfo.vue'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/Search/Search.vue')//按需引入
    },
    {
      path: '/member',
      name: 'membe',
      component: Member
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: ShopCar
    },
    {
      path:'/home/newslist',
      name:'newslist',
      component:()=>import('./components/NewsList/NewsList.vue')
    },
    {
      path:'/home/newslist/:id',//路由传参，同时在router-link中应该属性绑定的同时，传递一个变量参数
      name:'newsinfo',
      component:()=>import('./components/NewsInfo/NewsInfo.vue')
    },
    {
      path:'/home/photolist',
      name:'photolist',
      component:()=>import('./components/photos/PhotoList.vue')
    },
    {
      path:'/home/photolist/img/:id',
      name:'img',
      component:()=>import('./components/AllImg/AllImg.vue')
    },
    {
      path:'/home/goodslist',
      name:'goodslist',
      component:()=>import('./components/GoodsList/GoodsList.vue')
    },
    {
      path:'/home/goodslist/goodsinfo/:id',
      component:GoodsInfo
    },
    {
      path:'/home/goodslist/goodsdesc/:id',
      name:'goodsdesc',
      component:()=>import('./components/GoodsList/GoodsDesc.vue')
    },
    {
      path:'/home/goodslist/goodscomment/:id',
      name:'goodscomment',
      component:()=>import('./components/GoodsList/GoodsComment.vue')
    }
  ],
  linkActiveClass:'mui-active'//覆盖默认路由选中时的类，默认的类叫router-link-active
})
