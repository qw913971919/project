<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newslist/'+item.id">
          <img class="mui-media-object mui-pull-left" :src=item.img_url />
          <div class="mui-media-body">
            {{item.title}}
            <p class="mui-ellipsis">
              <span>{{item.add_time|dataFormat}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	name:'newslist',
	data(){
		return {
			newslist:[]
			}
	},
	methods:{
		getx(){
			this.$ajax.get("http://www.liulongbin.top:3005/api/getnewslist").then(result=>(this.newslist=result.data.message))
		}
	},
	created(){
		this.getx()
	}
};
</script>

<style scoped>
.mui-media-body{
  font-size: 14px;
}
.mui-ellipsis {
  display: flex; /*flex布局，使这个类中的两个span分开两边显示*/
  justify-content: space-between;
  color: #26a2ff;
}
</style>
