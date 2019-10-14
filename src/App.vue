<template>
  <div id="app">
    <div class="box">
      <mt-header fixed title="弱智软件"></mt-header>
      <transition>
      <router-view />
      </transition>
      <div id="nav">
        <nav class="mui-bar mui-bar-tab">
          <router-link class="mui-tab-item-b" to="/home">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
          </router-link>
          <router-link class="mui-tab-item-b" to="/member">
            <span class="mui-icon mui-icon-contact"></span>
            <span class="mui-tab-label">会员</span>
          </router-link>
          <router-link class="mui-tab-item-b" to="/shopcar">
            <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
              <span class="mui-badge" id="badge">{{$store.getters.notest}}</span>
            </span>
            <span class="mui-tab-label">购物车</span>
          </router-link>
          <router-link class="mui-tab-item-b" to="/search">
            <span class="mui-icon mui-icon-search"></span>
            <span class="mui-tab-label">搜索</span>
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>

<style lang='scss' scoped>
.mint-header{
  z-index: 99;
}
.nav{
  overflow-x:hidden;
}
.con{
  width:100%;
}
.box{
  width:100%;
  padding-top:40px;
  padding-bottom: 50px;
  overflow-x:hidden; //加overflow-x修复滚动条出现，内容区偏移问题
  
}
.v-enter{
  opacity: 0;
  transform: translateX(100%);

}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;//加absolute修复上进下出问题
}
.v-enter-active,.v-leave-active{
  transition: all 0.5s ease;
}
.mui-bar-tab .mui-tab-item-b.mui-active {//经过测试时因为mui-tab-item这条类名有冲突，因此将其的css样式复制出来，重新修改了类名，.mui-tab-item-b
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-b .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-b .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item-b {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;}
</style>