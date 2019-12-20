<template>
  <div>
    <!-- 头部 -->
    <el-card class="box-card myheader">
      <div class="text item">
        <el-form :inline="true" :model="subjectInfo" class="demo-form-inline fromHeader">
          <el-form-item label="学科编号">
            <el-input v-model="subjectInfo.rid" class="odd"></el-input>
          </el-form-item>
          <el-form-item label="学科名称">
            <el-input v-model="subjectInfo.name" class="even"></el-input>
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="subjectInfo.author" class="odd"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="subjectInfo.status" placeholder="请选择状态" class="even">
              <el-option label="启用" value="ON"></el-option>
              <el-option label="禁用" value="OFF"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button>清除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="el-icon-plus">新增学科</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 主体 -->
    <el-card class="box-card mybody">
      <div class="text item">
        <el-table :data="tableData">
          <!-- 序号列 -->
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="rid" label="学科编号"></el-table-column>
          <el-table-column prop="name" label="学科名称"></el-table-column>
          <el-table-column prop="short_name" label="简称"></el-table-column>
          <el-table-column prop="username" label="创建者"></el-table-column>
          <el-table-column prop="create_time" label="创建日期"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1">启用</span>
              <span v-else class="forbidden">禁用</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="editSubject(scope.row)">编辑</el-button>
              <el-button type="text" @click="forbiddenSubject(scope.row)">{{ scope.row.status === 1 ? "禁用":"启用"}}</el-button>
              <el-button type="text" @click="deleteSubject(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="page_sizes"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
          class="page"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 新增学科对话框组件 -->
    <addSubject></addSubject>
    <!-- 编辑学科对话框组件 -->
    <editSubject ref="editSub"></editSubject>
  </div>
</template>

<script >
// 导入新增组件
import addSubject from "./components/addSubject.vue";
// 导入编辑组件
import editSubject from './components/editSubject.vue';
// 导入工具函数
import { subjectList, subjectChange, subjectRemove } from "../../../api/subject.js";
export default {
  name: "subject",
  // 注册组件
  components: {
    addSubject,
    editSubject
  },
  data() {
    return {
      subjectInfo: {
        rid: "",
        name: "",
        author: "",
        status: ""
      },
      tableData: [],
      // 新增对话框是否显示
      dialogFormVisible: false,
      // 编辑对话框显示
      EditFormVisible: false,
      // 左侧页码容量按钮
      page_sizes: [2, 4, 6, 8],
      // 当前页
      page: 1,
      // 总页数
      total: 0,
      // 每页显示几条
      limit: 2
    };
  },
  methods: {
    onSubmit() {
      this.dialogFormVisible = true;
    },
    // 封装获取数据请求函数
    getData() {
      subjectList({
        limit: this.limit,
        page: this.page
        // ...this.subjectInfo,
      }).then(res => {
        // window.console.log("获取数据", res);
        // 将数据返回给table渲染
        this.tableData = res.data.items;
        // 总页码
        this.total = res.data.pagination.total;
      });
    },
    // 分页组件
    // 每页显示几条
    handleSizeChange(size) {
      // window.console.log("size",size)
      this.limit = size;
      this.getData();
    },
    // 当前是第几页
    handleCurrentChange(page) {
      // window.console.log("page",page)
      this.page = page;
      this.getData();
    },
    // 改变状态
    forbiddenSubject(item){
      subjectChange({
        id:item.id
      }).then((res)=>{
        // window.console.log(res)
        if(res.code === 200){
          this.getData()
        }
      })

    },
    // 删除学科
    deleteSubject(item){
      subjectRemove({
        id:item.id
      }).then((res)=>{
        if(res.code === 200){
          this.getData()
        }
      })
    },
    // 编辑学科
    editSubject(item){
      this.EditFormVisible = true;
      this.$refs.editSub.editForm = JSON.parse(JSON.stringify(item))
    }
  },
  // 进入页面调用
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
.el-card__body {
  display: flex;
  width: 100%;
}
.text {
  font-size: 14px;
}
.item {
  padding: 18px 0;
}
.el-main {
  line-height: 0;
}
.el-form--inline .el-form-item {
  margin-bottom: 0;
}
.el-form--inline .el-form-item__label {
  float: left;
}

// 头部卡片样式
.myheader {
  height: 103px;
}
// 底部卡片样式
.mybody {
  // text-align: center;
  margin-top: 19px;
  .text {
    width: 100%;
    // .is-leaf{

    // }
  }
  .el-table__row {
    .cell {
      width: 100%;
    }
  }
  // 分页
  .page {
    margin-top: 30px;
  }
  .forbidden {
    color: #ff3d3d;
  }
}
</style>