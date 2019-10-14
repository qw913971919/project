<template>
    <div class="newsinfo">
        <h1 class="title">{{newsobj.title}}</h1>
        <p class="subtitle">
            <span>{{newsobj.add_time|dataFormat}}</span>
            <span>{{newsobj.click}}</span>
        </p>
        <hr />
        <div class="content" v-html="newsobj.content"></div>
        <login>
        </login>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'//引入子组件
export default {
    name:'newsinfo',
    data(){
        return {
            id:this.$route.params.id,//从路由中获取传递的参数
            newsobj:[]

        }
    },
    methods:{
        gett(){
            this.$ajax.get("http://www.liulongbin.top:3005/api/getnew/"+this.id).then(result=>{
                this.newsobj=result.data.message[0]
            })
        }
    },
    components:{
        login:comment//注册子组件
    },
    created(){
        this.gett()
    }
}
</script>

<style lang="scss">
.newsinfo{
    padding: 0 3px;
    width:100%;
    .title{
        font-size: 20px;
        text-align: center;
        color:red;
        margin: 10px 0px 5px;
    }
    .subtitle{
        display: flex;
        color:#26a2ff;
        justify-content:space-between;
    }
    .content{
        img{
            width:100%;//给newsinfo下的content中的所有img设置宽度，调整图片大小，记得去掉style标签中的scoped，原因不明，老师说
        }
    }

}
</style>
