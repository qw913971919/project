<template>
  <div class="goodsinfo-container">
    <!--轮播区域-->
            <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
                <div class="ball" v-show="flag" ref="ball"></div>
            </transition>
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<lunbotu :img=message :color=true></lunbotu>
					</div>
				</div>
			</div>
              
    <!--商品购买区域-->
			<div class="mui-card">
				<div class="mui-card-header">{{goods.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						市场价：<del>￥{{goods.market_price}}</del>&nbsp;&nbsp;销售价：<span class="red">￥{{goods.sell_price}}</span>
                        <div>购买数量：
                            <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' :data-numbox-max='5'>
                                <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
                                <input class="mui-numbox-input" type="number" ref="input" @change="countChanged"/>
                                <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
                            </div>
                        </div>
                        <div>
                        <mt-button size="normal" type="primary" class="margin">立即购买</mt-button>
                        <mt-button size="normal" type="danger" class="margin" @click="test()">加入购物车</mt-button>
                        </div>
					</div>
				</div>
			</div>
    <!--商品详情区域-->
			<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{goods.goods_no}}</p>
                        <p>库存情况:{{goods.stock_quantity}}</p>
                        <p>上架时间:{{goods.add_time|dataFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button size="large" type="primary" class="margin" plain @click="goodsdesc(id)">图片简介</mt-button>
                    <mt-button size="large" type="danger" class="margin" plain @click="goodscomment(id)">商品评论</mt-button>
                </div>
			</div>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'//当js中单独使用mui时，需在那个模块下导入mui的js
import lunbotu from '../getlunbotu/getlunbotu.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,
            message:[],
            goods:[],
            flag:false,
            number:1,
        }
    },
    methods:{
        countChanged(){//使用@change监听文本框的变化，通过官网提供的方式获取到现在的值
            this.number=mui('.mui-numbox').numbox().getValue()
            console.log('现在number的值是'+this.number)
        },
        getsrc(){
            this.$ajax.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.$route.params.id).then(res=>{
                if(res.data.status===0){
                    res.data.message.forEach(re=> {
                        re.img=re.src
                    })
                    this.message=res.data.message
                    }
            })
        },
        getgoods(){
            this.$ajax.get('http://www.liulongbin.top:3005/api/goods/getinfo/'+this.$route.params.id).then(res=>{
                if(res.data.status===0){
                    this.goods=res.data.message[0]
                }
            })
        },
        goodsdesc(id){
            this.$router.push({name:'goodsdesc',params:{id}})//编程式导航
        },
        goodscomment(id){
            this.$router.push({name:'goodscomment',params:{id}})//编程式导航
        },
        test(){
            console.log(this.$refs.input.getBoundingClientRect())
            this.flag=!this.flag
            this.$store.commit('addcar',{id:this.id,count:this.number,selected:true})
            //拼接一个包含id，count数量，price单价，selected：false的对象提交给vuex
        },
        beforeEnter(el){//半场小球动画 钩子函数
            el.style.transform="translate(0,0)";
        },
        enter(el,done){//半场小球动画
            el.offsetwidth
            var left=document.getElementById('badge').getBoundingClientRect().left-this.$refs.ball.getBoundingClientRect().left
            var top=document.getElementById('badge').getBoundingClientRect().top-this.$refs.ball.getBoundingClientRect().top
            el.style.transform="translate("+left+'px'+','+top+'px'+")";
            el.style.transition="all 1s cubic-bezier(.4,-0.3,1,.68)";//半场小球动画
            done()//afterenter
        },
        afterEnter(){//半场小球动画
            this.flag=!this.flag
        }
    },//记住需要把想要改变的值属性绑定 :data-numbox-max
    watch:{//因为页面创建时，可能还未拿到真正的数据，所以goods.stock_quantity为空，但迟早会拿到这个数据，因此使用watch属性监听它，当goods.stock_quantity发生改变时,立即调用mui给出的js方法限定最大值
        'goods.stock_quantity':function(newVal,oldVal){
            mui('.mui-numbox').numbox().setOption('max',newVal)
        }
    },
    created(){
        this.getsrc()
        this.getgoods()
    },
    mounted(){
        mui(".mui-numbox").numbox()
    },
    components:{
        lunbotu,
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color:#eee;
    overflow: hidden;
}
.mui-card-content-inner{
    .red{
        color:red;
    }
    .margin{
        margin-right:15px;
    }
    div{
        .mui-numbox{
            margin:10px;
        }
    }
}
.mui-card-footer{
    display: flex;
    flex-wrap:wrap;
    button{
        margin:5px;
    }
    }
.ball{
    background-color: red;
    width:10px;
    height:10px;
    border-radius: 50%;
    position: absolute;
    z-index: 99;
    left:164px;
    top:400px;
}

</style>