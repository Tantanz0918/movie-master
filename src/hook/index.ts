import { computed,watch } from "vue"
import store from '../store'
//定义一些复用的函数

//跳转至对应id的详情页
export function jumpToDetail(router:Router,id:String|Number){
    router.push({
        name:"detail",
        query:{
            movieId:id
        }
    })
}

//评分为0时，置为空字符串用于显示
export function scfilter(value:number){
    if(value)
    return value
    else
    return ""
}

//更新地区时，在首页和电影列表中调用update函数
export function useUpdateCity(update:Function){
    //地区信息获取，以及地区信息更新后刷新数据
    let cd=computed(()=>store.state.cd.ct)
    watch(cd,(newvalue)=>{
        console.log("检测到位置更新，更新数据")
        update()
    })

}