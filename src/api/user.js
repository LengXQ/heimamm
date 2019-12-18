// 导入aixos
import axios from 'axios';

// 导入token工具函数
import {getToken} from '../utils/token.js';

// 统一配置axios
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true
});

// 暴露方法

// 获取用户信息
export function userInfo (){
    return instance({
        url:"/info",
        method:'get',
        headers:{
            token:getToken()
        }
    })
}

// 用户退出登录
export function loginOut (){
    return instance({
        url:"/logout",
        method:'get',
        headers:{
            token:getToken()
        }
    })
}