// 依赖vue,需要导入vue
import Vue from 'vue'
// 导入
import Vuex from 'vuex';
// use一下
Vue.use(Vuex)
// 创建中央仓库
const store = new Vuex.Store({
    state:{
        // 用户信息
        userInfo:{}
    }

})
// 暴露出去

export default store