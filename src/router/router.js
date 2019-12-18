import Vue from 'vue';
// 导入 路由
import VueRouter from 'vue-router';
//注册 vue-router
Vue.use(VueRouter);
// 实例化 

// 导入登录页
import login from '../views/login/login.vue';
// 导入首页
import index from '../views/index/index.vue';
// 导入 token工具函数
import { getToken, removeToken } from "../utils/token.js";
// 导入 element-ui的 Message
import { Message } from "element-ui";
// 导入获取登录用户信息接口
import { userInfo } from '../api/user.js'
// 导入中央仓库
import store from '../store/store.js';
const router = new VueRouter({
    routes: [
        {
        path: '/login',
        component: login
        },
        {
        path: '/index',
        component: index
        },
 ]
});


// 导航守卫
// 全局前置守卫
// to去的 路由
// from 来的 路由
// next 下一个

// 路由白名单
const whitePaths = ["/login"];//除login页进入不需要判断外,其他页面都需要判断

// 注册导航守卫
router.beforeEach((to, from, next) => {
    if(whitePaths.includes(to.path.toLocaleLowerCase()) === false) {
        // 如果没有在白名单内,就应该登录了才能访问
        if(!getToken()) {
            // 若没有登录提示用户先登录
            Message.warning("亲,请先登录哦");
            // 跳到登录页面
            next("/login");
        }else{
            // 若有token 则进入页面,并获取登录用户的信息
            userInfo().then((res)=>{
                //  window.console.log(res);
                store.state.userInfo = res.data.data;
                // 用户头像地址不完整,需要自行在前面加上基地址
                store.state.userInfo.avatar = process.env.VUE_APP_BASEURL + "/" + store.state.userInfo.avatar;
                 if(res.data.code === 200){
                     // token令牌是对的,放行 
                     next();
                 }else if(res.data.code === 206){
                    Message.warning("先去登录哟");
                    //  清除token
                     removeToken();
                    //  返回登录页面
                    next("/login");
                 }
            });
        }
    }else{
        // 在白名单里面,放行
        next();
    }

  })

// 暴露出去
export default router