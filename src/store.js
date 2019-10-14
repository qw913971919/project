import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    car:JSON.parse(localStorage.getItem('car'))||[]//加载localstorage中的json
  },
  mutations: {//负责处理数据
    addcar(state,data){
      var flag=false
      state.car.some(item => {
        console.log(state.car)
        if(item.id==data.id){
          item.count = item.count+parseInt(data.count)
          flag=true
          return true
        }
      })
      if(!flag){
        state.car.push(data)
      }
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsInfo(state,date){
      state.car.some(item=>{
        if(item.id==date.id){
          item.count=date.count
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    remove(state,id){
      state.car.forEach((item,i)=>{
        if(item.id==id){
          state.car.splice(i,id)
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  actions: {

  },
  getters:{//负责返回变化数据,一旦数据变化，重新求值
    notest:function(state){
      var c=0;
      state.car.forEach(item => {
        c=c+parseInt(item.count)
      });
      return c//需要一个return作为返回值
    },
    getGoodsCount(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id]=item.count//遍历购物车中的数据，花括号在对象后的意思是，o这个对象中名为item.id的属性，它的值为item.count
      })
      return o
    }
  }
})
