<template>
  <div id="login-container">
    <!-- 左边登录表单 -->
    <div class="login">
      <div class="title">
        <img src="../../assets/img.png" alt />
        <span>大佬俱乐部</span>
        <i></i>
        <span>用户登录</span>
      </div>
      <div class="login_form">
        <el-form ref="form" :model="form">
          <el-form-item>
            <!-- 输入手机号 -->
            <el-input v-model="form.name" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <!-- 输入密码 -->
          <el-form-item>
            <el-input v-model="form.name" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
          </el-form-item>
          <!-- 输入验证码 -->
          <el-row>
             <el-col :span="18"><div class="grid-content">
                  <el-form-item>
            <el-input v-model="form.name" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
          </el-form-item></div></el-col>
             <el-col :span="6"><div class="grid-content">
                 <img class="captcha" src="../../assets/captcha.png" alt=""></div></el-col>
          </el-row>
         <!-- 用户协议 -->
          <el-form-item>
            <el-checkbox-group v-model="form.type">
              <el-checkbox name="type" class="checkbox">
                我已阅读并同意
                <el-link type="primary">用户协议</el-link>和
                <el-link type="primary">隐私条款</el-link>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" class="myButton firstButton" @click="onSubmit">登录</el-button>
            <el-button type="primary" class="myButton" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 右边图片 -->
    <img src="../../assets/login_banner.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      }
    };
  },
   methods: {
      onSubmit() {
        window.console.log('submit!');
      },
      register(){
          
      }
    }
};
</script>

<style lang="less">
#login-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  height: 100%;
  // 左边登录表单
  .login {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding: 44px;
    .title {
      display: flex;
      align-items: center;
      color: #0c0c0c;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      span:nth-child(2) {
        font-size: 24px;
      }
      i:nth-child(3) {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
        margin: 0 13px;
      }
      span:nth-child(4) {
        font-size: 22px;
      }
    }
    .login_form {
        margin-top: 30px;
      .checkbox {
        display: flex;
        align-items: center;
        .el-checkbox__label {
          display: flex;
          align-items: center;
        }
      }
      .myButton{
          width: 100%;
          margin: 0
      }
      .firstButton{
          margin-bottom: 26px
      }
      .captcha{
          width: 100%;
          height: 42px;
      }
    }
  }
  // 右边图片
  img {
    width: 633px;
    height: 435px;
  }
}
</style>