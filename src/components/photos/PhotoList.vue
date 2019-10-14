<template>
  <div class="content">
    <div id="slider" class="mui-slider">
      <!--删除类名mui-fullscreen，不然的话这个导航会占满全屏，被挤到最上方-->
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll"><!--下边属性绑定，三元表达式，只有索引为0的item拥有mui-active，不然则第二个类名为空串，这里的高亮显示与路由无关，这里的高亮显示与路由的设置无关，是这个滑动条控件自带的方法-->
          <a :class="['mui-control-item',i==0?'mui-active':'']" :href="'#item'+(i+1)+'mobile'" :data-wid="'tab-top-subpage-'+(i+1)+'.html'" v-for="(item,i) in list" :key="item.id" @tap="getsrclist(item.id)">{{item.title}}</a>
        </div>
      </div>
    </div><!--可以把上边都注释掉，然后打包成app尝试究竟是因为什么导致的滚动失效-->
    <ul class="photo-list">
      <router-link :to="'/home/photolist/img/'+item.id" tag="li" v-for="item in srclist" :key="item.id" class="img"><!--mui-scroll-wrapper类名解决滚动失效未尝试，可以试试-->
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js"; //引入muijs时会因为严格模式报错，需借助插件关闭严格模式
export default {
  data() {
    return {
    list:[],
    srclist:[]
	};
  },
  methods: {
	  get(){
		  this.$ajax.get('http://www.liulongbin.top:3005/api/getimgcategory').then(res=>{
        res.data.message.unshift({title:'全部',id:0})//向message这个数组中添加一个新的对象
        this.list=res.data.message
		  })
    },
    getsrclist(id){
      this.$ajax.get('http://www.liulongbin.top:3005/api/getimages/'+id).then(res=>{
        this.srclist=res.data.message
      })
      //http://www.liulongbin.top:3005/api/getimages/0
    }
  },
  created(){
    this.getsrclist(0)
	  this.get()
  },
  mounted() {
    //在这个生命周期函数内部，调用滑动条的注册函数
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 /*flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006*/
    });
    
  }
};
/*
遇到的问题
1.记得删除mui-fullscreen这个类名，不然会样式出错。
2.严格模式需借助babel-plugin-transform-remove-strict-mode，-D安装，然后更改src根目录下的bableconfig.js为
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins:[
    [
      "component",
      {
        "libraryName": "mint-ui",
        "style": true
      }
    ]
],
  ignore:["./src/lib/mui/js/mui.min.js"]//忽略这个文件中因为严格模式导致的问题，前提是有安装过 babel-plugin-transform-remove-strict-mode -D
}
3.滑动块的控制台警告，需给样式*{touch-action：none}，不再弹出。
4.必须要通过官方提供的方式，激活滑动块的滑动，不然则无法滑动，这里我们通过生命周期mounted/页面已编译完成被挂载到页面中中激活，
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 /*flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      })；
5.下边栏突然失效，无法切换页面。
这是因为引入js后造成的类名冲突导致的，.mui-tab-item
修改下册导航栏中的.mui-tab-item类名，通过页面的方式将有关.mui-tab-item的类全部拷出来，然后随便改一个名字，即可修复
*/
</script>
<style lang="scss" scoped>
* {
  touch-action: none;//去除滑动警告
}
.mui-slider{
	margin:0px auto;
}
.photo-list{
  list-style: none;
  padding: 0 10px;
  margin: 0;
  .img{
    background: #ccc;
    text-align: center;//行内元素居中，img是行内元素，所以冷加载的转圈圈居中了
    margin-bottom: 7px;
    box-shadow: 0 0 9px #999;//设置阴影
    position: relative;
    .info{
      position: absolute;
      bottom:0;
      background-color: rgba(0,0,0,0.5);
      text-align: left;
      max-height: 110px;
      .info-title{
        font-size: 15px;
        color:blanchedalmond;
        text-indent: 2em;
        max-height: 16px;
        overflow: hidden;
      }
      .info-body{
        color:blanchedalmond;
        font-size: 13px;
        text-indent: 2em;
      }
    }
    img{
      width:100%;
      vertical-align:middle;//把元素放置在父元素的中部，这样既可完美居中对齐。
    }
    img[lazy="loading"] {//引入懒加载时，同时需要设置的样式，注意官方文档是image，实际是img
    width: 40px;
    height: 300px;
    margin: auto;
    }
  }
}
</style>