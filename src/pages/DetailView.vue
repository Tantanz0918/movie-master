<template>
  <detailTop :img="data.img" :cat="data.cat"  :nm="data.nm" :pubDesc="data.pubDesc" :sc="data.sc" :id="data.id" :key="data.key"></detailTop>
  <detailContent :dist="data.distributions" :dra="data.dra" :key="data.key"></detailContent>
 
</template>

<script lang="ts">
import { defineComponent, ComponentPublicInstance, reactive } from 'vue';
import {getDetail}from '../request/movie'

//获取上下文中暴露的东西
interface IInstance extends ComponentPublicInstance {
    data:Object
    updateKey():void
}

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const instance = vm as IInstance;
        getDetail(instance.data['id']).then(detailData=>{
            instance.data['img']=detailData['detailMovie']['img']
            instance.data['cat']=detailData['detailMovie']['cat']
            instance.data['distributions']=detailData['detailMovie']['distributions']
            instance.data['nm']=detailData['detailMovie']['nm']
            instance.data['dra']=detailData['detailMovie']['dra']
            instance.data['pubDesc']=detailData['detailMovie']['pubDesc']
            instance.data['sc']=detailData['detailMovie']['sc']
            instance.updateKey()
        },err=>{
            console.log("获取失败。使用默认数据")
        })
    });
  },
});
</script>

<script lang="ts" setup>
import detailTop from '../components/detailView/detailTop.vue'
import {useRoute} from 'vue-router'
import detailContent from '../components/detailView/detailContent.vue'
import { nanoid } from 'nanoid';

const route=useRoute()
//默认数据，加载后替换
const data=reactive({
    "img":"https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/4b90f603738da977a4a9dac0b151f8198718e353.jpg",
    "cat": "未知",
    "id":route.query.movieId,
    "distributions": [
        {
            "movieScoreLevel": "9-10分",
            "proportion": "--"
        },
        {
            "movieScoreLevel": "5-8分",
            "proportion": "--"
        },
        {
            "movieScoreLevel": "1-4分",
            "proportion": "--"
        }
    ],
    "dra": "",
    "nm": "正在加载中",
    "pubDesc": "",
	"sc": 0,
    "key":nanoid()
})
//更新数据时调用，修改key重新渲染
const updateKey=()=>{
    data.key=nanoid()
}
//暴露给beforeRouteEnter
defineExpose({data,updateKey});

</script>

<style>

</style>