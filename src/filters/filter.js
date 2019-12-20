import Vue from 'vue';
// 导入moment 插件
import moment from 'moment';


// 全局过滤器
Vue.filter("formartTime", function(time){
    return moment(time).format('YYYY📅MM🌙DD☀️');
})