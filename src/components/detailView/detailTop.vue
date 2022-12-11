<template>
  <div class="root">
    <div class="background"></div>
    <img class="poster" :src="img" alt="加载失败">
    <h1>{{nm}}<span class="score" >{{scfilter(sc)}}</span></h1>
    <span class="pub">{{pubDesc}}</span>
    <span class="cat">{{cat}}</span>
    <button class="like" type="button" v-if="!isliked && nm!='正在加载中'" @click="collectMovie(id,nm)">收藏</button>
    <button class="dislike" type="button" v-if="isliked && nm!='正在加载中'" @click="discollectMovie(id)">取消收藏</button>
    
  </div>
</template>

<script lang="ts" setup>
import { toRefs,ref } from "@vue/reactivity"
import { computed, onMounted, onUpdated } from "@vue/runtime-core"
import { useRouter } from "vue-router";
import {watch} from 'vue'
import { scfilter } from '../../hook';
const props=defineProps({
    img:String,
    cat:String,
    nm:String,
    pubDesc:String,
    sc:Number,
    id:String
})
const data=toRefs(props)
const isliked=ref(false);
const like=ref<null|Element>(null)
//点击收藏，改变本地存储
const collectMovie=(id:string,nm:string)=>{
  console.log(data.id)
  if(localStorage['likesId'])
  {
    localStorage.setItem('likesId',localStorage['likesId']+';'+data.id?.value)
    localStorage.setItem('likesNm',localStorage['likesNm']+';'+data.nm?.value)
  }
  else
  {
    localStorage.setItem('likesNm',nm)
    localStorage.setItem('likesId',id)
  }
  updateLiked()
}
//点击取消收藏，改变本地存储
const discollectMovie=(id:string)=>{
  let likesIdList=localStorage['likesId']?.split(";")
  let likesNmList=localStorage['likesNm']?.split(";")
  let index:Number=likesIdList.indexOf(id)
  console.log(likesIdList.splice(index,1))
  localStorage.setItem('likesId',likesIdList.splice(index,1).join(';')||"")
  localStorage.setItem('likesNm',likesNmList.splice(index,1).join(';')||"")
  updateLiked()
}
//更新收藏状态，在挂载后和点击收藏后调用改变
const updateLiked=()=>{
  isliked.value=localStorage['likesId']?.split(";").includes(data.id?.value+"")
  console.log(localStorage['likesId'])
}

const router=useRouter()
 onMounted(()=>{
  updateLiked()
  console.log(localStorage)
 })
</script>

<style lang="less" scoped>
.root{
  top:10%;
  width: 100vw;
  height:600px;
  background-color: #fff;
  position:relative;
  span{
    display: inline-block;
  }
  .background{
    height: 400px;
    background-image: -webkit-linear-gradient(left,#392f59,#81472c);
  }
  img{
    position: absolute;
    width:230px;
    height:340px;
    border:5px solid white;
    top:120px;
    left:20%;
  }
  h1{

    position: absolute;
    color:white;
    font-size: 2.5rem;
    font-weight: 600;
    top:250px;
    left:33%;
    .score{
      margin-left: 10px;
      font-weight: 400px;
      color:#e5342a;
    }
  }
  .cat{
    position: absolute;
    left:33%;
    color:white;
    font-size:large;
    top:230px;
  }
  .pub{
    position: absolute;
    left:33%;
    color:white;
    font-size:large;
    top:300px;
  }
  button{
    position: absolute;
    width:200px;
    height:50px;
    
    border:none;
    top:335px;
    left:33%;
    border-radius: 25px;
    z-index: 998;
    transition: all .3s;
   
  }
  .like{
   background-color: rgb(255, 240, 123);
    &:hover{
      background-color: rgb(240, 181, 45);

    }
  }
  .dislike{
    background-color: rgb(255, 123, 127);
    color:white;
    &:hover{
      background-color: rgb(255, 61, 61);

    }
  }
}
</style>