<template>
  <div class="topBox">
    <div class="topContentBox">
      <img src="../assets/img/logo.png" alt="logo图" class="logo">
      <div  @mouseenter="cityListShow=true" @mouseleave="cityListShow=false" :class="cityListShow?'position cityActive':'position'">
        {{cd}}
        <button class="positionButton"></button>
        <div class="cityList" v-if="cityListShow">
          <div>
            <div v-for="(letter,index) of letters" :key="index" v-show="cityList[index].length!=0">
              <h3>{{letter}}</h3>
              <div class="letterList" >
                <button 
                  @click="store.dispatch('updateCityData',{ci:city['id'],ct:city['nm']})"
                  v-for="city of cityList[index]" 
                  :key="city['id']"
                >
                  {{city['nm']}}
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div class="catagory">
            <router-link class="catagoryButton" :to="{path:'/'}" :class="router.currentRoute.value.fullPath==='/'?'active':''">首页</router-link>
            <router-link class="catagoryButton" :to="{name:'class',params:{type:'hot'}}" :class="router.currentRoute.value.fullPath.indexOf('/movie')===0?'active':''">电影</router-link>
            <router-link class="catagoryButton" :to="{path:'/cinema'}" :class="router.currentRoute.value.fullPath.indexOf('/cinema')===0?'active':''">影院</router-link>
            <router-link class="catagoryButton" :to="{path:'/collection' }" :class="router.currentRoute.value.fullPath.indexOf('/collection')===0?'active':''">收藏</router-link>
      </div>
      <div class="searchBox">
        <input type="search" v-model="searchValue">
        <button class="searchButton" @click="router.push({name:'search',query:{kw:searchValue}})"></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUpdate, onMounted, reactive,ref,computed } from 'vue'
import  { useRouter,onBeforeRouteUpdate } from 'vue-router'
import bus from '../bus'
import {cityData} from '../util'
import {getCity} from '../request/city'
import store from '../store'
const router=useRouter()

//城市悬浮窗有关变量
let cityListShow=ref(false)//城市选择悬浮窗
let letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
let cityList=reactive([[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]])//下表与字母表对应

//搜索
let searchValue=ref("")

//监视地名变化
let cd=computed(()=>store.state.cd.ct)

//加载城市列表的有关系，并进行排序
const loadCityData=()=>{
  getCity().then(data=>{
    console.log("城市数据")
    console.log(data)
    for(let city of data['cts'])
    {
      // console.log("城市为"+city['nm']+"字母为"+city['py'].slice(0,1)+"加到"+(city['py'].slice(0,1).toUpperCase().charCodeAt()-65))
      cityList[city['py'].slice(0,1).toUpperCase().charCodeAt()-65].push(city);
    }
  })
}

onMounted(()=>{
  store.dispatch('updateCityData',{ci:20,ct:'广州'})
  loadCityData()
})
  


</script>

<style lang="less"  scoped>
  .topBox{
    position: fixed;
    left:0;
    top:0;
    height: 8%;
    width:100%;
    border-bottom: 1px solid rgb(216, 216, 216);
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    background-color: #fff;
    z-index: 999;
      .topContentBox{
        width:50%;
        display: flex;
        align-items: center;
        height: 100%;
        *{
          float: left;
        }
        .logo{
          height: 100%;
        }
        .position{
          width:100px;
          height: 100%;
          padding:0 10px;
          display: flex;
          border: 2px solid white;
          align-items: center;
          justify-content: right;
          position: relative;
          .positionButton{
            margin-left: 5px;
            width:20px;
            height:20px;
           background-image: url(../assets/img/icons/下拉.png);
            float: none;
            border:none;
            background-size: cover;
           background-color:transparent;
           
          }
          
          .cityList{
            position: absolute;
            left: -2px;
            top:75px;
            width: 500px;
            height: 400px;
           padding: 10px;
            background-color: #fff;
            border: 2px solid #eee;
            &::before{
              content: "";
              position: absolute;
              top: -8px;
              left: 0;
              background-color: white;
              width:98px;
              height:10px;
              
            }
            >div{
               overflow: auto;
               width: 100%;
               height:100%;
            }
            >div>div{
              display: flex;
              justify-content: space-between;
            }
            h3{
              display: inline-block;
              width:30px;
              font-size:2rem;
              color:#e5342a;
            }
            .letterList{
              width: 420px;
              padding: 10px;
              button{
                margin: 3px 5px;
                background-color: #fff;
                border:none;
                &:hover{
                  color:#ff483f;
                }
              }
            }
          }
        }
        .cityActive{
            border: 2px solid #eee;
            border-top-color: transparent;
            border-bottom-color: transparent;
          }
        .catagory{
          //margin:0 5%;
          height: 100%;
          display: flex;
          flex-wrap: nowrap;
          .catagoryButton{
          
            font-size:large;
            display: inline-block;
            height: 100%;
            width:6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover{
              background-color: #fa433a;
              color:white;
            }
          }
          .active{
            background-color: #fa433a !important;
              color:white !important;
          }
        }
        .searchBox{
          margin-left:30px;
          width:25%;
          height:3.2vmin;
          border:1px solid #ff5349;
          border-radius: 1.6vmin;
          display: flex;
          justify-content: center;
          input{
            width: 80%;
            height:100%;
            font-size:larger;
          }
          button{
            width:10%;
            height:100%;
            background-image: url(../assets/img/icons/搜索.png);
            background-size: cover;
            background-color: transparent;
            border:none;
            &:hover{
              cursor:pointer;
            }
          }
        }
    }
  }

  
</style>