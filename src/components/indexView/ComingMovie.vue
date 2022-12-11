<template>
    <MovieListSmall :data-movie="coming" :info-name="'wish'" :key="comingListId"></MovieListSmall>
  </template>
  
  <script lang="ts" setup>
  import { onBeforeMount, onMounted, reactive, watch,ref } from "@vue/runtime-core";
  import {getExpected} from '../../request/movie'
  import store from '../../store'
  import MovieListSmall from '../Items/MovieListSmall.vue'
  import {nanoid} from 'nanoid'
import { useUpdateCity } from "../../hook";
  
  //id，方便重新渲染
  let comingListId=ref(nanoid())
  
  //update函数，发起请求
  const update=()=>{
      getExpected(store.state.cd).then((data)=>{
        // console.log(data)
          coming=data['coming'].slice(0,8)
          comingListId.value=nanoid()
      },err=>{
          console.log(err)
      })
  }
    //地区变化时更新
    useUpdateCity(update)
  //初始化数据
  let coming=reactive([{id:111,nm:"haha",sc:1,img:"xx"},{id:22221,nm:"haa",sc:1,img:"xx"}])
  onBeforeMount(()=>{
      update()
  })
  

  
  
  </script>
  
  <style>
  
  </style>