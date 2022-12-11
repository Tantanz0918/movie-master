import service from "."
import { cityDataInterface } from "../util"


//获取正在热映的电影
export function getHot(data:cityDataInterface){
    return service({
        url:"/movie/hot",
        method:"get",
        params:{
            ci:data.ci,
            ct:data.ct
        }
    })
}

//获取近期最受期待的电影
export function getExpected(data:cityDataInterface){
    return service({
        url:"/movie/expected",
        method:"get",
        params:{
            ci:data.ci,
            ct:data.ct
        }
    })
}

//热门经典
export function getClassical(){
    return service({
        url:"/movie/class",
        method:"get",
       
    })
}

//详细信息
export function getDetail(id:String|Number){
    return service({
        url:"/movie/detail?movieId="+id,
        method:"get",
       
    })
}

//电影列表
export function getMovieList(showType:number,page:number){
    return service({
        url:"/movie/class?showType="+showType+"&limit=24&offset="+(page-1)*24,
        method:"get",
       
    })
}

//搜索
export function searchMovie(ci:number,page:number,kw:string){
    return service({
        url:"/search/movies?ci="+ci+"&limit=24&offset="+((page-1)*24+1)+"&kw="+kw,
        method:"get",
       
    })
}