import Vue from 'vue';
import App from './App.vue';
// 导入接收 路由
import router from './router/router.js';
// 导入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入初始化样式 base文件
import './style/base.css'
// 注册ElementUI
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  // 挂载 router
  router,
  render: h => h(App),
}).$mount('#app')