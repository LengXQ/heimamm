<template>
  <div>
    <!-- 头部 -->
    <el-card class="box-card myheader">
      <div class="text item">
        <el-form :inline="true" :model="enterpriseInfo" class="demo-form-inline fromHeader">
          <el-form-item label="企业编号">
            <el-input v-model="enterpriseInfo.rid" class="odd"></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="enterpriseInfo.name" class="even"></el-input>
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="enterpriseInfo.username" class="odd"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="enterpriseInfo.status" placeholder="请选择状态" class="even">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="clear">清除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="el-icon-plus">新增企业</el-button>
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
          <el-table-column prop="eid" label="企业编号"></el-table-column>
          <el-table-column prop="name" label="企业名称"></el-table-column>
          <el-table-column prop="username" label="创建者"></el-table-column>
          <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="scope">
                <span>{{scope.row.create_time | formartTime}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1">启用</span>
              <span v-else class="forbidden">禁用</span>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="editenterprise(scope.row)">编辑</el-button>
              <el-button
                type="text"
                @click="forbiddenEnterprise(scope.row)"
              >{{ scope.row.status === 1 ? "禁用":"启用"}}</el-button>
              <el-button type="text" @click="deleteEnterprise(scope.row)">删除</el-button>
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

    <!-- 新增企业对话框组件 -->
    <addEnterprise></addEnterprise>
    <!-- 编辑企业对话框组件 -->
    <editEnterprise ref="editEnt"></editEnterprise>
  </div>
</template>

<script >
// 导入新增组件
import addEnterprise from "./components/addEnterprise.vue";
// 导入编辑组件
import editEnterprise from "./components/editEnterprise";
// 导入工具函数
import { enterpriseList, enterpriseDelete, enterpriseChange} from "../../../api/enterprise.js";
export default {
  name: "enterprise",
  // 注册组件
  components: {
    addEnterprise,
    editEnterprise
  },
  data() {
    return {
      enterpriseInfo: {
        eid: "",
        name: "",
        username: "",
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
    forbiddenEnterprise(item) {
      // window.console.log(item)
      enterpriseChange({
        id: item.id
      }).then(res => {
        // window.console.log(res)
        if (res.code === 200) {
          this.getData();
        }
      });
    },
    // 删除企业
    deleteEnterprise(item) {
      this.$confirm("亲，真的要删除吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认删除
          enterpriseDelete({
            id: item.id
          }).then(res => {
            if (res.code === 200) {
              this.getData();
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑企业
    editenterprise(item) {
      this.EditFormVisible = true;
      this.$refs.editEnt.editForm = JSON.parse(JSON.stringify(item));
    },
    // 检索企业，获取数据
    getData() {
      // window.console.log(this.enterpriseInfo)
      enterpriseList({
        limit: this.limit,
        page: this.page,
        ...this.enterpriseInfo
      }).then(res => {
        // window.console.log("获取数据", res);
        // 将数据返回给table渲染
        this.tableData = res.data.items;
        // 总页码
        this.total = res.data.pagination.total;
      });
    },
    // 清空条件
    clear() {
      this.enterpriseInfo = {};
    }
  },
  // 进入页面调用
  created() {
    this.getData();
  }
};
</script>

<style lang="less">