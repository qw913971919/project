<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,i) in img" :key="i">
        <img :src="item.img" :class="{bb:color}"/><!--当color这个父元素传递过来的值为true时，img会多一个class，控制图片宽高-->
      </mt-swipe-item>
      <!--循环遍历img这个数组，item为遍历出的对象，i为索引，img为遍历的数组，在这个循环内部，可以直接使用item来调用其中的数据-->
    </mt-swipe>
  </div>
</template>

<script>
export default {
    props:['img','color']

}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  text-align:center;
  img {
    height: 100%;
    width:100%;
  }
  .bb{
      width:auto;
  }
  .mint-swipe-item:nth-child(1) {
    //交集选择器
    //控制第一张图片颜色
  }
  .mint-swipe-item:nth-child(2) {
    //交集选择器
    //控制第二张图片颜色
  }
}
</style>