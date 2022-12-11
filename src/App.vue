<script setup>
import Top from './components/Top.vue'
import { onMounted } from 'vue';

onMounted(() => {
  document.body.style.setProperty('--el-color-primary', '#e5342a');
  document.body.style.setProperty('--el-color-primary-light-9', '#ffd4d2');
  document.body.style.setProperty('--el-color-primary-light-3', '#fa7676');
})
</script>

<template>
  <div id="app">
    <Top></Top>
    <router-view></router-view>
    
    
  </div>
</template>

<style lang="less">
#app{
  position:relative;
  min-height: 100vh;
  .wrapper{
    position: absolute;
    top:10%;
    width:60%;
    margin:0 20%;
  }

}
</style>
