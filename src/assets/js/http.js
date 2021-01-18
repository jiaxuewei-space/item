//axios拦截器
import Vue from 'vue'
import axios from 'axios'
import store from '../../store'
const http = axios.create({
    baseURL:''
});
//响应拦截器
http.interceptors.response.use(res=>{
    if(res.data.code !=200){
        Vue.prototype.$message(res.data.msg)
    }
    return res
})

//请求拦截器
http.interceptors.request.use(req=>{
    if(store.state.userinfo){
        req.headers.Authorization = store.state.userinfo.token
    }
    return req;
})

export default http;