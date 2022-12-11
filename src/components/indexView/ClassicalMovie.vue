<template>
    <MovieListSmall :data-movie="classical" :info-name="'cat'" :key="classicalListId"></MovieListSmall>
  </template>
  
  <script lang="ts" setup>
  import { onBeforeMount, onMounted, reactive, watch,ref } from "@vue/runtime-core";
  import {getClassical} from '../../request/movie'
  import store from '../../store'
  import MovieListSmall from '../Items/MovieListSmall.vue'
  import {nanoid} from 'nanoid'
  import {useUpdateCity} from '../../hook'

  //id，方便重新渲染
  let classicalListId=ref(nanoid())
  
  //update函数，发起请求
  const update=()=>{
      getClassical().then((data)=>{
          classical=data['classicMovies'].list.slice(0,8)
          classicalListId.value=nanoid()
      },err=>{
          console.log(err)
      })
  }
    
  //地区变化时更新
  //class不用，请求中没用地区信息
//   useUpdateCity(update)

  //初始化数据
  let classical=reactive([{id:111,nm:"haha",sc:1,img:"xx"},{id:2221,nm:"haa",sc:1,img:"xx"}])
  onBeforeMount(()=>{
      update()
  })


  
  
  </script>
  
  <style>
  
  </style>