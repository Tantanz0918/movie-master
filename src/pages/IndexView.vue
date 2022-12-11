<template>
  <div class="wrapper">
      <div class="indexSession">
        <h2 class="sessionTitle">正在热映<router-link :to="{name:'class',params:{type:'hot'}}">查看更多</router-link></h2>
        
        <HotMovie/>
      </div>
      <div class="indexSession">
        <h2 class="sessionTitle">即将上映<router-link :to="{name:'class',params:{type:'expected'}}">查看更多</router-link></h2>
        
        <ComingMovie/>
      </div>
      <div class="indexSession">
        <h2 class="sessionTitle" >热门经典<router-link :to="{name:'class',params:{type:'classical'}}">查看更多</router-link></h2>
        
        <ClassicalMovie/>
      </div>
  </div>

</template>

<script lang="ts" setup>

import HotMovie from '../components/indexView/HotMovie.vue'
import ComingMovie from '../components/indexView/ComingMovie.vue'
import ClassicalMovie from '../components/indexView/ClassicalMovie.vue'


</script>

<style lang="less" scoped>
.indexSession{
    width:100%;
    margin: 2rem 0;
    
    .sessionTitle{
      position: relative;
        font-weight: 400;
        color:#e5342a;
        font-size:2rem;
        letter-spacing: 3px;
    }
    a{
      position: absolute;
      font-size:1rem;
      display: inline-block;
      margin-right: 30px;
      right: 0;
      bottom: 0;
      color:#f6544c;
      &:hover{
        color:#ff7c75;
      }
    }
}
</style>