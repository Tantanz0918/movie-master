
<template>
   <div class="wrapper">
      <div class="indexSession">
        <h2 class="sessionTitle">本地收藏</h2>
        <h3 v-if="likesIdList[0]===''||likesIdList.length===0">暂无收藏~</h3>
        <ul v-if="likesIdList[0]!=''">
           <li v-for="(like,index) in likesIdList" :key="like.toString()" >
            <div class="index">{{index+1}}</div>
            <div class="movieName" @click="jumpToDetail(router,like)"> {{likesNmList[index]}}</div>
            <div class="deleteButton" @click="deleteMovie(index)">取消收藏</div>
           </li>
        </ul>
      </div>
  </div>
</template>

<script setup lang="ts">

import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { jumpToDetail } from '../hook'

const router=useRouter()
const likesNmList:String[]=reactive(localStorage['likesNm']?.split(';'))
const likesIdList:String[]=reactive(localStorage['likesId']?.split(';'))

  //删除对应index的id和name，重组为localStorage
  //可以跟详情页取消收藏合并，但是那边要调用回调函数，而且也复用不了多少代码
const deleteMovie=(index:number)=>{
  if(window.confirm("确定要取消收藏吗？"))
  {
      likesIdList.splice(index,1)
      likesNmList.splice(index,1)
      localStorage.setItem('likesId',likesIdList.join(';'))
      localStorage.setItem('likesNm',likesNmList.join(';'))
  }

}

</script>

<style lang="less" scoped>
.indexSession{
    width:100%;
    margin: 2rem 0;
    .sessionTitle{
        font-weight: 400;
        color:#e5342a;
        font-size:2rem;
        letter-spacing: 3px;
    }
    h3{
      font-size: 1.5rem;
      text-align: center;
      margin-top:100px;
    }
    li{
      display: block;
      width: 600px;
      height:40px;
      background-color: #eee;
      margin: 20px auto;
      *{
        transition: all .3s;
      }
      .index{
        float: left;
        height: 100%;
        width:40px;
        background-color: #f74e45;
        font-size: 1.5rem;
        color:white;
        text-align: center;
        padding-top:5px;
      }
      .movieName{
        float: left;
        height: 100%;
        width: 450px;
        font-size: 1.2rem;
        padding-left:5px;
        padding-top:8px;
        text-overflow: ellipsis;
        &:hover{
          background-color: #d4d4d4;
        }
      }
      .deleteButton{
        float: right;
        width:110px;
        height:100%;
        font-size: 1.2rem;
        padding-left:5px;
        padding-top:8px;
        text-align: center;
        color:white;
        text-overflow: ellipsis;
        background-color: #ff5b52;
        &:hover{
          background-color: #e72727;
        }
      }
    }

}
</style>