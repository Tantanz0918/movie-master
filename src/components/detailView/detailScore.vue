<template>
  <div v-for="item of dist" :key="(item['index']||0)" class="scoreItem">
    <span class="lable">{{item['movieScoreLevel']}}</span>
    <span :style="`width:${item['proportion']*4}px;`" class="zhuzi"></span>
    <span v-if="item['proportion']==='--'" >暂无评分</span>
  </div>
</template>

<script lang="ts" setup>
const props=defineProps({
    dist:<Object>Array
})

</script>

<style lang="less" scoped>
.scoreItem{
    margin:7px 0;
    display: flex;
    align-items: center;
}
.lable{
width:10%;
}
.zhuzi{
    height: 20px;
    width:0;
    background-color: #fe5047;
    transition:all .3s;
}
span{
    display: inline-block;
}
</style>