<template>
  <el-dialog title="新增学科" :visible.sync="$parent.EditFormVisible" center>
    <el-form :model="editForm" :rules="rule" ref="editForm">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid" hide-required-asterisk>
        <el-input v-model="editForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="editForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.EditFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="edit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectEdit } from "../../../../api/subject.js";
export default {
  data() {
    return {
      editForm: {},
      rule: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    edit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          subjectEdit(this.editForm).then(res => {
            // window.console.log("编辑", res);
            if(res.code === 200){
              // 异步请求,需要等请求完成后再执行清空
                // 提示
                this.$message.success("修改成功");
                // 隐藏对话框
                this.$parent.EditFormVisible = false;
                // 将表单输入框重置
                this.$refs.editForm.resetFields();
                // 再次调用父级获取数据请求,完成数据渲染
                this.$parent.getData()
            }else if(res.code === 201){
              this.$message.error("学科编号已存在，请重新输入");
            }
          });
        } else {
          this.$message.error("编辑失败,请重新填写");
          return false;
        }
      });
    },

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