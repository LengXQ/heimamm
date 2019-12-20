<template>
  <el-container>
    <el-header class="myHeader">
      <div class="left">
        <i class="el-icon-s-operation icon" @click="isCollapse = !isCollapse"></i>
        <img class="logo" src="../../assets/index_01.png" alt />
        <span class="title">阳光学校管理系统</span>
      </div>
      <div class="right">
          <img class="icon" :src="$store.state.userInfo.avatar" alt="">
          <span class="username">{{ $store.state.userInfo.username }},你好</span>
           <el-button type="primary" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container >
      <el-aside width="auto" class="myContainer">
    <el-menu default-active="/index/chart" class="el-menu-vertical-demo" :collapse="isCollapse" router>
      <el-menu-item index="/index/chart">
        <i class="el-icon-pie-chart"></i>
        <span slot="title">数据概览</span>
      </el-menu-item>
      <el-menu-item index="/index/user">
        <i class="el-icon-user"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
      <el-menu-item index="/index/question">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">题库列表</span>
      </el-menu-item>
      <el-menu-item index="/index/enterprise">
        <i class="el-icon-office-building"></i>
        <span slot="title">企业列表</span>
      </el-menu-item>
      <el-menu-item index="/index/subject">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">学科列表</span>
      </el-menu-item>
    </el-menu>
      </el-aside>
      <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data() {
        return {
            // 导航列表伸缩
            isCollapse: false
        }
    },

};
</script>

<style lang="less">
// 饿了么官方样式
.el-header,
.el-footer {
//   background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
/* background-color: #d3dce6;*/  color: #333;text-align: center;line-height: 200px;height: 100%;}
.el-main { background-color: #e9eef3; color: #333; text-align: center; line-height: 160px;  height: 100%; }
body > .el-container {  margin-bottom: 40px; /* 高100百分之百*/ height: 100%; }
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside { line-height: 260px; }
.el-container:nth-child(7) .el-aside {line-height: 320px;}
// 折叠样式
.el-menu-vertical-demo:not(.el-menu--collapse) {width: 200px;min-height: 400px;}
// 自行配置样式
.myHeader{
    display: flex;
    justify-content: space-between;
    .left,
    .right{
        display: flex;
        align-items: center
    };
    .left{
        .icon{
            // 字体图标
            font-size: 24px
        }
        .logo{
            width: 33px;
            height: 28px;
            margin: 0 11px 0 22px
        }
        .title{
            font-size: 22px;
            color: #49A1FF;
        }
    };
    .right{
        .username{
            font-size: 14px;
            color: #636363;
            margin: 0 38px 0 9px
        }
        .icon{
            width: 43px;
            height: 43px;
            border-radius: 50%;
        }
    }
}
.myContainer{
    li{
        text-align: left
    }
}




</style>