

<template>
  <div class="selectBar">
    <a ref="hot" @click.stop="clickLink('hot')" :class="type==='hot'?'active':''">正在热映</a>
    <a ref="expected"  @click.stop="clickLink('expected')"  :class="type==='expected'?'active':''">即将上映</a>
    <a ref="classical"  @click.stop="clickLink('classical')" :class="type==='classical'?'active':''">热门经典</a>
  </div>
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
    <MovieListSmall :data-movie="movieList" :info-name="infoName" :key="listKey"></MovieListSmall>
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

<script setup lang="ts">
import { nanoid } from "nanoid"
import { computed, onMounted, ref,reactive } from "vue"
import { useRouter } from "vue-router"
import { getMovieList} from '../request/movie'
import MovieListSmall from '../components/Items/MovieListSmall.vue'
import { useUpdateCity } from "../hook"
const router=useRouter()
const hot=ref(null)
const expected=ref(null)
const classical=ref(null)
let type=ref('hot')
let currentPage=ref(1)
let listKey=ref(nanoid())
let totalNum=ref(4)//默认的电影数量为4个

//1.电影数据有关
//未加载时显示的默认数据
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
    // console.log("加载页码"+currentPage.value+";加载类型"+type.value)
    let showType=1
    switch(type.value){
        case 'hot':
        showType=1
        break
        case 'expected':
        showType=2
        break
        case 'classical':
        showType=3
        break
    }
    getMovieList(showType,currentPage.value).then(data=>{
        console.log(data)
        movieList=data['classicMovies']['list']
        if(data['classicMovies']['total']>=480)
        totalNum.value=480
        else
        totalNum.value=data['classicMovies']['total']
        listKey.value=nanoid()
    })
}
//地区变化时更新
useUpdateCity(update)

//2.路由有关
//点击路由按钮
const clickLink=(to:string)=>{
    type.value=to
    currentPage.value=1
    router.replace({
        name:'class',
        params:{
            type:to
        }
    })
    update()
}
//初次进入界面时，自动选中对应按钮并加载对应的东西哇
onMounted(()=>{
    
    switch(router.currentRoute.value.fullPath){
        case '/movie/class/hot':
        type.value='hot'
        break
        case '/movie/class/expected':
        type.value='expected'
        break
        case '/movie/class/classical':
        type.value='classical'
        break
    }
    
    update()
})

//3.样式有关
//根据类型计算infoName，显示不同的滑块
let infoName=computed(()=>{
    switch(type.value){
        case 'hot':
        return ""
        break
        case 'expected':
        return "wish"
        break
        case 'classical':
        return "cat"
        break
    }
})




</script>


<style lang="less" scoped>
.selectBar{
  height: 6%;
  position:absolute;
  top:10%;
  background-color: #47464a;
  width:100%;
  display: flex;
  justify-content: center;
  line-height: 100%;
  a{
    display: flex;
    color:#eee;
    width: 10%;
    height:100%;
    align-items: center;
    justify-content: center;
    margin: 0 1px;
    font-size: large;
    &:hover{
      color:#e5342a;
    }
  }
  .active{
    color:#e5342a;
    position:relative;
    &:before{
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border:  10px solid transparent;
      border-bottom-color:white;
      left: calc(50%-5px);
      bottom: -2px;
    }
  }
}
.wrapper{
top:16%!important; 
    h3{
        font-size: 1.5rem;
        text-align: center;
        margin:80px 0;
        }
}

.parinationBox{
    width:100%;
    display: flex;
    justify-content: center;
    margin: 1rem 0;
}
</style>