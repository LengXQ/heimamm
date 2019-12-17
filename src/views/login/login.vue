<template>
  <div id="login-container">
    <!-- 左边登录表单 -->
    <div class="login">
      <!-- 表单标题 -->
      <div class="title">
        <img src="../../assets/img.png" alt />
        <span>大佬俱乐部</span>
        <i></i>
        <span>用户登录</span>
      </div>
      <!-- ======================================登录============================================== -->
      <!-- 表单内容 -->
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
            <el-col :span="18">
              <div class="grid-content">
                <el-form-item prop="captcha">
                  <el-input v-model="form.captcha" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <img class="captcha" :src="captchaUrl" alt="网络似乎错误(⊙o⊙)？" @click="Captcha" />
              </div>
            </el-col>
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
            <el-button type="primary" class="myButton" @click="dialogFormVisible = true">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- =================================注册对话框============================================= -->

    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" class="register">
      <el-form :model="regform" ref="regform" :rules="regRules">
        <!-- 头像 -->
        <el-form-item label="头像" :label-width="formLabelWidth" prop="icon">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="regform.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="regform.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="regform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="regform.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="18">
              <el-input v-model="regform.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="5" :offset="1">
              <img :src="regCaptchaUrl" alt="网络似乎错误(⊙o⊙)？" @click="regCaptcha" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 动态验证码 -->
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
          <el-row>
            <el-col :span="18">
              <el-input v-model="regform.rcode" autocomplete="off"></el-input>
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="5" :offset="1">
              <button
                class="regButton"
                :disabled="time != 0"
                @click="onlineCaptcha"
              >{{ time==0 ? "获取验证码" : `重新获取(${time}s)`}}</button>
              <div class="grid-content bg-purple-light"></div>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickRegister">注 册</el-button>
      </div>
    </el-dialog>

    <!-- 右边图片 -->
    <img src="../../assets/login_banner.png" alt />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    // 手机号码正则校验
    var checkPhone = (rule, value, callback) => {
      const phoneNum = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!value) {
        // 若为空,结束业务,提示输入手机号
        return callback(new Error("请输入用户手机号"));
      } else {
        // 满足正则验证
        if (phoneNum.test(value) == true) {
          callback();
        } else {
          // 不满足正则验证
          callback(new Error("亲,手机号填写错误哟"));
        }
      }
    };
    // 邮箱正则验证规则
    var checkEmail = (rule, value, callback) => {
      // 手机号码正则校验
      const Email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (!value) {
        // 若为空,结束业务,提示输入邮箱
        return callback(new Error("请填写邮箱地址"));
      } else {
        // 满足正则验证
        if (Email.test(value) == true) {
          callback();
        } else {
          // 不满足正则验证
          callback(new Error("亲,邮箱地址填写错误哟"));
        }
      }
    };
    return {
      // 登录表单
      form: {
        phone: "",
        password: "",
        captcha: "",
        // 协议是否勾选
        checked: false
      },
      // 注册表单
      regform: {
        username: "",
        email: "",
        phone: "",
        password: "",
        // 图形验证码
        code:"",
        // 动态验证码
        rcode: "",
        // 头像
        avatar: ""
      },
      rules: {
        // 手机验证规则
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        // 密码验证规则
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "change"
          }
        ],
        // 验证吗验证规则
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4位", trigger: "change" }
        ]
      },
      regRules: {
        // 用户名验证
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change"
          }
        ],
        // 手机验证规则
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        // 密码验证规则
        password: [
          { required: true, message: "请填写用户密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "change"
          }
        ],
        // 邮箱验证规则
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        // 验证吗验证规则
        rcode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4位", trigger: "change" }
        ]
      },
      // 登录页验证码地址
      captchaUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      // 对话框是否可见
      dialogFormVisible: false,
      // label文字的宽度
      formLabelWidth: "65px",
      // 头像文件上传地址
      uploadUrl: process.env.VUE_APP_BASEURL + "/uploads",
      // 头像上传
      imageUrl: "",
      // 在线验证码计时器时间
      time: 0,
      // 注册页验证码地址
      regCaptchaUrl: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms"
    };
  },
  methods: {
    //  登录按钮表单校验
    onSubmit() {
      if (this.form.checked == false) {
        //  协议没勾选,提示(饿了么自带的消息提示框)
        this.$message.warning("亲,请认真阅读协议并勾选哦");
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$message.success("欢迎登录");
          } else {
            this.$message.error("内容有误,请重新填写,亲");
            return false;
          }
        });
      }
    },
    // 登录页验证码刷新
    Captcha() {
      this.captchaUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now();
    },
    // 头像上传
    // 上传成功后
    handleAvatarSuccess(res, file) {
      // window.console.log(res);
      // window.console.log(file);
      // 将上传成功之后返回的路径存起来
      this.regform.avatar = res.data.file_path;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 注册页验证码刷新
    regCaptcha() {
      this.regCaptchaUrl =
        process.env.VUE_APP_BASEURL + "/captcha?type=sendsms&" + Date.now();
    },
    // 获取动态验证码
    onlineCaptcha() {
      // 判断验证码是否为空且为4位
      if(this.regform.code != "" && this.regform.code.length == 4){
        // 判断一下填写的手机号是否正确
        const userPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (userPhone.test(this.regform.phone)) {
          this.time = 60;
          let timeId = setInterval(() => {
            this.time--;
            if (this.time == 0) {
              clearInterval(timeId);
            }
          }, 1000);
          // 发送请求,获取动态验证码
          axios({
            url: process.env.VUE_APP_BASEURL + '/sendsms',
            method:'post',
            // 跨域携带cookie
            withCredentials: true,
            data: { 
              code: this.regform.code,
              phone: this.regform.phone
            },
          }).then(res=>{
            //成功回调
            // window.console.log(res)
            this.$message.success("手机验证码为:" + res.data.data.captcha)
          });
        }else{
          return this.$message.error("亲,手机号填写有误哦!")
        }
      }else{
        return this.$message.error("图形码错误,请重新填写")
      }
    },
    // 注册表单验证
    clickRegister() {
      this.$refs.regform.validate(valid => {
        if (valid) {
          // 验证成功后调用注册接口
          axios({
            url: process.env.VUE_APP_BASEURL + "/register",
            method: "post",
            data: {
              username: this.regform.username,
              phone: this.regform.phone,
              email: this.regform.email,
              avatar: this.regform.avatar,
              password: this.regform.password,
              rcode: this.regform.rcode
            }
          }).then(res => {
            //成功回调
            window.console.log(res);
          });
          this.$message.success("注册成功");
          this.dialogFormVisible = false;
        } else {
          this.$message.error("内容有误,请重新填写,亲");
          return false;
        }
      });
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
      .myButton {
        width: 100%;
        margin: 0;
      }
      .firstButton {
        margin-bottom: 26px;
      }
      // 验证码大小
      .captcha {
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
  // 注册页面(对话框)
  .register {
    text-align: center;
    .el-dialog {
      width: 603px;
      margin-top: 30px !important;
      .el-dialog__header {
        background: linear-gradient(to right, #02c4fa, #1394fa);
      }
    }
    .dialog-footer {
      display: flex;
      justify-content: center;
    }
    .el-col img {
      width: 100%;
      height: 42px;
    }
    .regButton {
      width: 100%;
      height: 30px;
    }
  }
  // 头像部分
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>