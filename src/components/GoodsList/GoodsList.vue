<template>
  <div class="goods-list">
        <div class="goods-item" v-for="(item,i) in goodslist" :key="item.id" @click="goDetail(item.id)">
              <img :src="item.img_url">  
              <h1>{{item.title}}</h1>
              <div class="content">
                <p>
                  <span class="new">￥{{item.sell_price}}</span>
                  <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                <span>热卖中</span>
                <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button size="large" type="danger" @click="add()">加载更多</mt-button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            goodslist:[],
            a:1
        }
    },
    methods:{
        getgoodslist(b){
            this.$ajax.get('http://www.liulongbin.top:3005/api/getgoods?pageindex='+b).then(res=>{
                this.goodslist=this.goodslist.concat(res.data.message);
            })
        },
        add(){
            this.a++
            this.getgoodslist(this.a)
        },
        goDetail(id){
            this.$router.push('/home/goodslist/goodsinfo/'+id)  //vue-router自带的方法，用于跳转页面，this.$router是一个路由导航对象，用它可以方便的视线路由的跳进、后退、跳转，这是编程式导航的写法
            //共有三种编程式导航的写法，详情可参考vue-router的官方文档
        }
    },
    created(){
        this.getgoodslist(1)
    }
}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    justify-content:space-between;
    flex-wrap:wrap;//容器内部元素自动换行
    padding:3px 15px;
    .goods-item{
        border:1px solid #ccc;
        width:48%;
        margin:5px 0px;
        box-shadow: 0 0 8px #999;
        padding:2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h1{
            font-size: 14px;
            overflow: hidden
        }
        img{
            width:100%;
        }
        .content{
            background:#ddd;
            p{
                margin:0;
                padding:5px;
                .new{
                    color:red;
                    font-size:15px;
                    font-weight: bold;
                }
                .old{
                    font-size:12px;
                    margin-left: 10px;
                    text-decoration: line-through;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>