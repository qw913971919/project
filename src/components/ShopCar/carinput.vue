<template>

                                <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' :data-numbox-max='5'>
                                    <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
                                    <input class="mui-numbox-input" type="number" ref="input" @change="countChanged" :value="initcount"/>
                                    <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
                                </div>

</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'//当js中单独使用mui时，需在那个模块下导入mui的js
export default {
    data(){
        return {
            number:1,
        }
    },
    props:['initcount','idg'],
    methods:{
        countChanged(){//使用@change监听文本框的变化，通过官网提供的方式获取到现在的值
            //当值被改变时触发change的方法，向store传递修改后的商品数量向car中添加的数据
            this.number=this.$refs.input.value
            console.log(this.number)
            this.$store.commit('updateGoodsInfo',{
                id:this.idg,
                count:this.$refs.input.value
            })
        },
    mounted(){
        mui(".mui-numbox").numbox()

    }
}
}
</script>
<style lang="scss" scoped>

</style>