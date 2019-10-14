<template>
    <div class="body">
        <h1 class="title">{{body.title}}</h1>
        <p class="subtitle">
            <span>发表时间:{{body.add_time|dataFormat}}</span>
            <span>点击:{{body.click}}次</span>
        </p>
        <hr />
        <div class="img">
        <vue-preview :slides="slide1" class="biu"></vue-preview>
        </div>
        <div class="content">
            <p v-html="body.content"></p>
        </div>
        <comment></comment>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,
            body:[],
            slide1: []
        }
    },
    methods:{
        getcontent(){
            this.$ajax.get('http://www.liulongbin.top:3005/api/getimageinfo/'+this.id).then(res=>{
                this.body=res.data.message[0]
            })
        },
        getimg(){
            this.$ajax.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id).then(res=>{
                res.data.message.forEach(item => {
                    item.w=600;
                    item.h=400;
                    item.alt='picture1';
                    item.title='Image Caption 1'
                    item.msrc=item.src
                });
                this.slide1=res.data.message
            })
        }
    },
    components:{
        'comment':comment//引入子组件
    },
    created(){
        this.getcontent()
        this.getimg()
    }
}
</script>

<style lang="scss" >

.body{
    .img{
    text-align: center;
    figure{
        margin:0px;
        padding:0px;
        display: inline;
        a{
            img{
                box-shadow:0 0 8px #999;
                width: 100px;
            }
        }
        }
    }
    .title{
        margin:7px 0px;
        text-align: center;
        font-size: 18px;
        color:#26a2ff
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size:14px;
        margin-top:10px;
        span{
            
        }
    }
    .content{
        padding:0 2px;
        p{
            text-indent: 2em;
        }
    }
}
</style>