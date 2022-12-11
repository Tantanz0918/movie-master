<template>
  <MovieListSmall :data-movie="hot" :info-name="''" :key="hotListId"></MovieListSmall>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, watch,ref } from "@vue/runtime-core";
import {getHot} from '../../request/movie'
import store from '../../store'
import MovieListSmall from '../Items/MovieListSmall.vue'
import {nanoid} from 'nanoid'
import { useUpdateCity } from "../../hook";

//id，方便重新渲染
let hotListId=ref(nanoid())

//update函数，发起请求
const update=()=>{
    getHot(store.state.cd).then((data)=>{
        hot=data.data['hot'].slice(0,8)
        hotListId.value=nanoid()
    },err=>{
        console.log(err)
    })
}
  //地区变化时更新
  useUpdateCity(update)
//初始化Hot数据
let hot=reactive([{id:111,nm:"haha",sc:1,img:"xx"},{id:2221,nm:"haa",sc:1,img:"xx"}])
onBeforeMount(()=>{
    update()
})




</script>

<style>

</style>