<template>
  <ul>
    <MovieItemSmall
      v-for="item of dataMovie" 
      :key="item['id']" 
      :name="item['nm']" 
      :id="item['id']" 
      :score="item['sc']" 
      :img="item['img']" 
      :info="item[infoName]||''"
     >
      <!-- info滑块前后缀，用插槽实现 -->
      <!-- expected -->
      <template v-slot:beforeInfo v-if="infoName==='wish'">
        <span>有</span>
      </template>
      <template v-slot:afterInfo v-if="infoName==='wish'">
        <span>人想看</span>
      </template>
    </MovieItemSmall>
  </ul>
</template>

<script lang="ts" setup>
import { toRefs } from "@vue/reactivity"
import MovieItemSmall from './MovieItemSmall.vue'

type Props = {
  dataMovie:Object
  infoName:string
}
const props = defineProps<Props>()

const {dataMovie} =toRefs(props)

</script>

<style lang="less" scoped>
ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>