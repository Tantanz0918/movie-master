 import axios from 'axios'
//创建axios示例
const service=axios.create({
    baseURL:"api",
    timeout:5000,
    headers:{
        "Content-Type":"application/json;charset=utf-8"
    }
})
//请求拦截，仅学习用，不会使用到token
service.interceptors.request.use((config)=>{
    config.headers=config.headers||{}
    if(localStorage.getItem('token')){
        config.headers.token=localStorage.getItem('token') || ""
    }
    return config
})

//响应拦截
service.interceptors.response.use((res)=>{
    const code:number=res.data.code 
    if(code!=0){
        //成功连接到了但是由于某些原因失败
        return Promise.reject(res.data)
    }
    //成功
    return res.data.data
},(err)=>{
    console.log(err)
}
)

export default service