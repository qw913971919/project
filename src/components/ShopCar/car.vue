<template>
		<div class="mui-content">
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner" v-for="(item,i) in datalist" :key="item.id">
						<mt-switch></mt-switch>
                        <img :src="item.thumb_path" style="height:60px;width:60px;" />
                        <div class="content">
                            <h3>{{item.title}}</h3>
                            <div class="info">
                                <span class="price">￥{{item.sell_price}}</span>
                                <carinput :initcount="$store.getters.getGoodsCount[item.id]" :idg="item.id"></carinput>
                                <a href="javascript:;" @click="remove(i,item.id)">删除</a>
                            </div>
                        </div>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'//当js中单独使用mui时，需在那个模块下导入mui的js
export default {
    data(){
        return {
            number:0,
            arr:[],
            datalist:[]
        }
    },
    components:{
        carinput:()=>import('./carinput.vue')
    },
    methods:{
        remove(i,b){
            this.datalist.splice(i,1)//从索引为i的地方开始删除，删除一个
            this.$store.commit('remove',b)
        },
        getvalue(){
            
        },
        countChanged(){//使用@change监听文本框的变化，通过官网提供的方式获取到现在的值
   
        },
        getlist(){
            this.$store.state.car.forEach(item => {
                this.arr.push(item.id)
            })
            this.$ajax.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/'+this.arr.join(',')).then(res=>{
                this.datalist=res.data.message
                console.log(this.datalist)
            })
        }
    },
    mounted(){
        mui(".mui-numbox").numbox()

    },
    created(){
        this.getlist()
    }
}
</script>
<style lang="scss" scoped>
.mui-content{
    padding-top:1px;
    background-color:white
}
.mui-card-content-inner{
    display: flex;
    align-items:center;
    img{
      
    }
    .content{
        h3{
            font-size: 13px;
        }
        .info{
            display: flex;
            align-items:center;
            a{
                font-size:10px;
            }
            .price{
                display: block;
                color:red;
                min-width: 50px;
                font-weight: bold;
            }
            .mui-numbox{
                margin:0px 5px;
            }
        }
    }
}
</style>