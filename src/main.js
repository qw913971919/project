import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
import './lib/mui/css/mui.css' //引入mui的样式表
import './lib/mui/css/icons-extra.css'//引入小图标扩展的样式和图片
import './lib/mui/fonts/mui.ttf'//引入mui的小图标
import './lib/mui/fonts/mui-icons-extra.ttf'//引入小图标扩展的样式和图片
import axios from 'axios'
import moment from 'moment' //导入时间格式化插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)//定义是时间过滤器
})
Vue.prototype.$ajax=axios//将axios放在原型对象中，使用时this.$ajax.post||
/*import { Header,Swipe, SwipeItem,Button } from 'mint-ui'
/*import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);文档错误，这里必须要全局引用mintui,因此把这里所有有关mintui的代码全部注释了！！！！！！！！！*/
/*Vue.component('Swipe', Swipe);
Vue.component('SwipeItem', SwipeItem);/*
import 'mint-ui/lib/style.css'//这里是按需引入，官方文档错误，必须要引入样式表才能正常使用。
/*import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'//全局引入miutui，并且，将其注册到vue实例上
Vue.use(MintUI);
*/
/*Vue.component('Header', Header )//将mint-ui中按需拿到的组件Header，注册为同名组件，使用时，直接在任何界面上以标签形势引入即可，记住需要按照官网上的html结构复制。
Vue.component('Button', Button )*/
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
