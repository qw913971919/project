<template>
  <div class="con">
    <lunbotu :img="img"></lunbotu>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newslist">
          <img src="../../imges/menu1.png" />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/photolist">
          <img src="../../imges/menu2.png" />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to='/home/goodslist' href="#">
          <img src="../../imges/menu3.png" />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../imges/menu4.png" />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../imges/menu5.png" />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../imges/menu6.png" />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import lunbotu from '../getlunbotu/getlunbotu.vue'//引入子组件
export default {
  data() {
    return {
      img: []
    };
  },
  methods: {
    get() {
      this.$ajax.get("http://www.liulongbin.top:3005/api/getlunbo").then(result => (this.img = result.data.message)); //发送数据请求
      //获取数据复制给img
    }
  },
  components:{
    lunbotu,//注册子组件 名字:()=>import('对象模板')
  },
  created() {
    this.get(); //定义生命周期函数，执行post获取数据
  }
};
</script>

<style lang='scss' scoped>
 .mui-table-view-cell .mui-active{
   background-color: red;
 }
 
//这里需要加scoped才能正常将这个在浏览器窗口中看到的类设置为高度200px，不设置高度，轮播图不显示
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0px;
}
.con {
  width: 100%;
}

.mui-grid-view.mui-grid-9 {
  background-color: white;
  .mui-table-view-cell {
    background-color: white;
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
