<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/user/add')"
      >添加</el-button
    >
    <el-table :data="arr"  border>
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="所属角色" prop="rolename"></el-table-column>
      <el-table-column label="管理员名称" prop="username"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1">启用</el-tag>
          <el-tag v-else>禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width:150px>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push('/user/' + scope.row.uid)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="del(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    background
    :total="total" :page-size="5"
    layout="prev, pager, next"
    @current-change="pageChange"
    ></el-pagination>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      arr: [],
      total:0,
      page:1
    };
  },

    mounted() {
    this.axios({url:'/api/usercount'}).then(res=>{
      this.total = res.data.list[0].total
    })
    this.getPageList();
  },

  methods: {
    getPageList(){
      this.axios.get('/api/userlist',{params:{size:5,page:this.page}}).then(res=>{
        this.arr = res.data.list;
      })
    },
    pageChange(n){
      this.page = n;
      this.getPageList();
    },
    del(obj) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios.post("/api/userdelete", { uid: obj.row.uid }).then((res) => {
            if (res.data.code === 200) {
              // this.arr = res.data.list;
              this.arr.splice(obj.$index,1)
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "info",
                message: res.data.msg,
              });
            }
          });
        })
        .catch(() => {
        });
    },
  },

};
</script>

<style scoped>
.el-pagination{
  margin-top: 5px;
  float: right;
}
</style>