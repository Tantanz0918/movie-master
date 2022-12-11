<template>
  <div class="wrapper">
    <div class="indexSession">
      <h2 class="sessionTitle">电影简介</h2>
      <div class="sessionContent">{{dra}}</div>
    </div>
    <div class="indexSession">
      <h2 class="sessionTitle">猫眼评分</h2>
      <div class="sessionContent"><detailScore :dist="dist"/></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import detailScore from './detailScore.vue'
const props=defineProps({
   dist:Array,
   dra:String
})
</script>

<style lang="less" scoped>
.wrapper{
padding-top:400px;
}
.indexSession{
    width:100%;
    margin: 2rem 0;
    .sessionTitle{
        font-weight: 400;
        color:#e5342a;
        font-size:2rem;
        letter-spacing: 3px;
    }
    .sessionContent{
      color:#555;
      padding: 20px;
      font-size:large;
      text-indent: 2em;
      line-height: 150%;
    }

}
</style>