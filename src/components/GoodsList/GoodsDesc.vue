<template>
    <div>
        <h3 class="desc_title">{{message.title}}</h3>
        <hr />
        <div class="content" v-html="message.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            message:[]
        }
    },
    methods:{
        getGoodsDesc(){
            this.$ajax.get('http://www.liulongbin.top:3005/api/goods/getdesc/'+this.$route.params.id).then(res=>{
                this.message=res.data.message[0]
            })
        }
    },
    created(){
        this.getGoodsDesc()
    }
}
</script>

<style lang="scss">
*{
    margin:0px;
    padding:0px;
    
}
.desc_title{
    font-size: 16px;
    text-align: center;
    line-height: 20px;
    margin-top:10px;
    color:#26a2ff;
}
.content{
    p{
        margin:0;
        padding:0;
        min-height: 0;
    }
    table{
        border-collapse:collapse;
        width:100%;  //这一行解决了img图片在table中不会适应宽度的问题
        border: 0px;
    }
    padding:5px;
    img{
        text-align: center;
        width:100%;
        height: auto;
        display:block;margin:0px;//这两行解决了img图片在table td中间隙白边的问题
        
    }
}
</style>