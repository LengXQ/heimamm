import Vue from 'vue';
// 导入 路由
import VueRouter from 'vue-router';
//注册 vue-router
Vue.use(VueRouter);
// 实例化 


import login from '../views/login/login.vue';
import index from '../views/index/index.vue';
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

// 暴露出去
export default router