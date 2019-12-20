<template>
  <el-dialog title="新增企业" :visible.sync="$parent.dialogFormVisible" center>
    <el-form :model="form" :rules="rule" ref="form">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid" hide-required-asterisk>
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { enterpriseAdd } from "../../../../api/enterprise.js";
export default {
  data() {
    return {
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rule: {
        rid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }]
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    add() {
      this.$refs.form.validate(valid => {
        if (valid) {
          enterpriseAdd(this.form).then(res => {
            // window.console.log("新增", res);
            // 异步请求,需要等请求完成后再执行清空
            if(res.code === 200){
              // 提示
              this.$message.success("新增成功");
              // 隐藏对话框
              this.$parent.dialogFormVisible = false;
              // 将表单输入框重置
              this.$refs.form.resetFields();
              // 再次调用父级获取数据请求,完成数据渲染
              this.$parent.getData()
            }else if (res.code === 201){
              this.$message.error("企业编号已存在，请重新输入");
            }
          });
        } else {
          this.$message.error("新增失败,请重新填写");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.el-dialog__wrapper {
  .el-dialog {
    width: 602px;
    .el-dialog__header {
      background: linear-gradient(to right, #01c5fa, #1394fa);
      span,
      i {
        color: white;
      }
    }
  }
}
</style>