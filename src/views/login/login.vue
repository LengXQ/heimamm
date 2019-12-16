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
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="phone">
            <!-- 输入手机号 -->
            <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <!-- 输入密码 -->
          <el-form-item prop="password">
            <el-input v-model="form.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
          </el-form-item>
          <!-- 输入验证码 -->
          <el-row>
             <el-col :span="18"><div class="grid-content">
                  <el-form-item prop="captcha">
            <el-input v-model="form.captcha" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
          </el-form-item></div></el-col>
             <el-col :span="6"><div class="grid-content">
                 <img class="captcha" src="../../assets/captcha.png" alt=""></div></el-col>
          </el-row>
         <!-- 用户协议 -->
          <el-form-item>
              <el-checkbox class="checkbox" v-model="form.checked">
                我已阅读并同意
                <el-link type="primary">用户协议</el-link>和
                <el-link type="primary">隐私条款</el-link>
              </el-checkbox>

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
    var checkPhone = (rule, value, callback) => {
      // 手机号码正则校验
      const phoneNum = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!value) {
          // 若为空,结束业务,提示输入手机号
         return callback(new Error('请输入用户手机号'));
        } else {
          // 满足正则验证
          if (phoneNum.test(value) == true) {
             callback();
          }else{
            // 不满足正则验证
            callback(new Error('亲,手机号填写错误哟'));
          }
        }
      };
    return {
      form: {
        phone:"",
        password:"",
        captcha:"",
        // 协议是否勾选
        checked:false
      },
      rules: {
        // 手机验证规则
        phone: [
          { required: true, validator: checkPhone,  trigger: 'blur' }
        ],
        // 密码验证规则
        password: [
            { required: true, message: '请输入用户密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'change' }
          ],
          // 验证吗验证规则
        captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '验证码长度为4位', trigger: 'change' }
          ],
        }
    };
  },
   methods: {
      onSubmit() {
       if(this.form.checked == false){
        //  协议没勾选,提示(饿了么自带的消息提示框)
        this.$message.warning("亲,请认真阅读协议并勾选哦")
       }else{
          this.$refs.form.validate( valid => {
          if (valid) {
            this.$message.success("欢迎登录")
          } else {
            this.$message.error("内容有误,请重新填写,亲")
            return false;
          }
        });
       }
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