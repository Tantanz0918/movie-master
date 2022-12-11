<template>
  <div class="wrapper">
    <el-backtop :bottom="100" :right="300">
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #e5342a;
      "
    >
      UP
    </div>
  </el-backtop>
    <MovieListSmall :data-movie="movieList" :info-name="''" :key="listKey"></MovieListSmall>
    <h3 v-if="movieList.length===0">木有数据啦~</h3>
    <div class="parinationBox">
        <!-- 分页器 -->
        <el-pagination 
        layout="prev, pager, next" 
        :total="totalNum"  
        :page-size="24"
        :pager-count="5"
        :current-page="currentPage"
        @current-change="update"
        background
        />
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import { nanoid } from "nanoid"
import { computed, onMounted, ref,reactive, watch } from "vue"
import { useRouter,useRoute, onBeforeRouteUpdate } from "vue-router"
import { searchMovie} from '../request/movie'
import { useUpdateCity } from "../hook"
import MovieListSmall from '../components/Items/MovieListSmall.vue'
import store from "../store"
const router=useRouter()
const route=useRoute()
let currentPage=ref(1)
let listKey=ref(nanoid())
let totalNum=ref(4)//默认的电影数量为0个

//1.默认电影数据，避免加载时出现无数据字样
let movieList=reactive([
            {
                "act": "",
                "cat": "未知",
                "dir": "詹姆斯·卡梅隆",
                "dur": 192,
                "enm": "Avatar ：The Way Of Water",
                "fra": "美国,中国台湾,中国香港,日本",
                "frt": "2022-12-16,2022-12-14,2022-12-15,2022-12-16",
                "ftime": "",
                "globalReleased": false,
                "id": 111,
                "img": "https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/4b90f603738da977a4a9dac0b151f8198718e353.jpg",
                "movieAlias": "",
                "movieType": 0,
                "nm": "默认数据",
                "onlinePlay": false,
                "pubDesc": "2022-12-16中国大陆上映",
                "rt": "2022-12-16",
                "sc": 0,
                "show": "",
                "showStateButton": {
                    "color": "#3C9FE6",
                    "content": "预售",
                    "onlyPreShow": false
                },
                "showst": 4,
                "src": "美国",
                "star": "萨姆·沃辛顿,佐伊·索尔达娜,西格妮·韦弗",
                "type": 0,
                "ver": "IMAX 3D/杜比影院 3D",
                "vodPlay": false,
                "wish": 0,
                "wishst": 0
            },{
                "act": "",
                "cat": "未知",
                "dir": "詹姆斯·卡梅隆",
                "dur": 192,
                "enm": "Avatar ：The Way Of Water",
                "fra": "美国,中国台湾,中国香港,日本",
                "frt": "2022-12-16,2022-12-14,2022-12-15,2022-12-16",
                "ftime": "",
                "globalReleased": false,
                "id": 111,
                "img": "https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/4b90f603738da977a4a9dac0b151f8198718e353.jpg",
                "movieAlias": "",
                "movieType": 0,
                "nm": "默认数据",
                "onlinePlay": false,
                "pubDesc": "2022-12-16中国大陆上映",
                "rt": "2022-12-16",
                "sc": 0,
                "show": "",
                "showStateButton": {
                    "color": "#3C9FE6",
                    "content": "预售",
                    "onlyPreShow": false
                },
                "showst": 4,
                "src": "美国",
                "star": "萨姆·沃辛顿,佐伊·索尔达娜,西格妮·韦弗",
                "type": 0,
                "ver": "IMAX 3D/杜比影院 3D",
                "vodPlay": false,
                "wish": 0,
                "wishst": 0
            },{
                "act": "",
                "cat": "未知",
                "dir": "詹姆斯·卡梅隆",
                "dur": 192,
                "enm": "Avatar ：The Way Of Water",
                "fra": "美国,中国台湾,中国香港,日本",
                "frt": "2022-12-16,2022-12-14,2022-12-15,2022-12-16",
                "ftime": "",
                "globalReleased": false,
                "id": 111,
                "img": "https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/4b90f603738da977a4a9dac0b151f8198718e353.jpg",
                "movieAlias": "",
                "movieType": 0,
                "nm": "默认数据",
                "onlinePlay": false,
                "pubDesc": "2022-12-16中国大陆上映",
                "rt": "2022-12-16",
                "sc": 0,
                "show": "",
                "showStateButton": {
                    "color": "#3C9FE6",
                    "content": "预售",
                    "onlyPreShow": false
                },
                "showst": 4,
                "src": "美国",
                "star": "萨姆·沃辛顿,佐伊·索尔达娜,西格妮·韦弗",
                "type": 0,
                "ver": "IMAX 3D/杜比影院 3D",
                "vodPlay": false,
                "wish": 0,
                "wishst": 0
            },{
                "act": "",
                "cat": "未知",
                "dir": "詹姆斯·卡梅隆",
                "dur": 192,
                "enm": "Avatar ：The Way Of Water",
                "fra": "美国,中国台湾,中国香港,日本",
                "frt": "2022-12-16,2022-12-14,2022-12-15,2022-12-16",
                "ftime": "",
                "globalReleased": false,
                "id": 111,
                "img": "https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/4b90f603738da977a4a9dac0b151f8198718e353.jpg",
                "movieAlias": "",
                "movieType": 0,
                "nm": "默认数据",
                "onlinePlay": false,
                "pubDesc": "2022-12-16中国大陆上映",
                "rt": "2022-12-16",
                "sc": 0,
                "show": "",
                "showStateButton": {
                    "color": "#3C9FE6",
                    "content": "预售",
                    "onlyPreShow": false
                },
                "showst": 4,
                "src": "美国",
                "star": "萨姆·沃辛顿,佐伊·索尔达娜,西格妮·韦弗",
                "type": 0,
                "ver": "IMAX 3D/杜比影院 3D",
                "vodPlay": false,
                "wish": 0,
                "wishst": 0
            },
           
        ],)

//根据页码加载东西,用到type和currentPage，如果是用分页器就有参数num，要改页码
const update=(num?:number)=>{
    if(num)
    currentPage.value=num
    window.scrollTo(0,0)
    searchMovie(store.state.cd.ci,currentPage.value,queryString.value).then(data=>{
        console.log(data)
        movieList=data['movies']
        if(data['total']>=480)
        totalNum.value=480
        else
        totalNum.value=data['total']
        listKey.value=nanoid()
    })
}

//换城市更新
useUpdateCity(update)
//初次进入界面时加载对应的东西哇
onMounted(()=>{
    update()
})
//页面内修改搜索字段引起变化
let queryString=computed(()=>{
    return route.query['kw']
})
watch(queryString,()=>{update()})


</script>

<style lang="less" scoped>
h3{
    font-size: 1.5rem;
    text-align: center;
    margin:80px 0;
}

.parinationBox{
    width:100%;
    display: flex;
    justify-content: center;
    margin: 1rem 0;
}
</style>