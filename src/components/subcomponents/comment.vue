<template>
    <div>
        <h1>发布评论</h1>
        <hr />
        <textarea maxlength="120" placeholder="做多吐槽120个字" v-model="text"></textarea>
        <mt-button size="large" type="primary" @click="postcomment()">点击发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in bb" :key="i">
                <div class="cmt-title">
                第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time|dataFormat}}
                </div>
                <div class="cmt-body">{{item.content}}</div>
            </div>
        </div>
        <mt-button size="large" type="danger" plain @click="add()">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            bb:[],
            pageindex:1,
            text:""
        }
    },
    methods:{
        getcomment(){
            this.$ajax.get('http://www.liulongbin.top:3005/api/getcomments/'+this.$route.params.id+'?pageindex='+this.pageindex).then(result=>(
                this.bb=this.bb.concat(result.data.message)//拼接数组bb，触发点击事件，调用这个函数，拼接，往复循环
            ))
        },
        add(){
            this.pageindex++,
            this.getcomment()
        },
        postcomment(){
            if(this.text.trim().length===0){
               return Toast("评论内容不能为空。")//加上return即终止这个函数，后边的代码不再执行
            }
            this.$ajax.post('http://www.liulongbin.top:3005/api/postcomment/'+this.$route.params.id,{content:this.text}/* 请求报文体，要发送的数据，是一个被对象包裹的多个键值对。*/)
            .then(/*这里是成功的回调*/ res=>{
                if(res.data.status===0){//因为向服务器发送数据时，并不会刷新页面，因此，手动拼接一个对象，加入数组中，在客户端生成一个发表评论的外在框，这样既可不用每次刷新后再显示
                    var cmt={
                        user_name:'匿名用户',
                        add_time:Date.now(),
                        content:this.text
                    };
                    this.bb.unshift(cmt)//向bb这个数组中，将自己手动拼接的对象添加在第一位，当bb出现变化时，因为属性绑定的缘故，页面会被刷新
                    this.text=""
                }else{console.log('失败')}
            })
        }
    },
    created(){
        this.getcomment()
    }
}
</script>
<style lang="scss" scoped>
    div{
        mt-button{
            margin:7px auto;
        }
        h1{
            font-size: 15px;
        }
        textarea{
            font-size:12px;
            height: 100px;
        }
        .cmt-list{
            .cmt-title{
                background:#ccc;
                font-size: 14px;
                line-height: 30px;
            }
            .cmt-body{
                text-indent: 2em;
                font-size: 15px;
                margin: 5px 0px;
            }
        }
    }
</style>


