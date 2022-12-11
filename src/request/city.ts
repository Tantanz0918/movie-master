import service from ".";

//调用返回的是一个promise，要用then，但是500错误之类的根本没获取到的就不会出现因为被拦截了
export function getCity(){
    return service({
        url:"/city",
        method:"get",
    })
}



//未被使用仅供学习
interface loginData{
    username:string,
    password:string
}

export function login(data:loginData){
    return service({
        url:"/login",
        method:"post",
        data
    })
}