<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规格管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/specs/add')"
      >添加</el-button
    >
    <el-table :data="arr"  border>
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="规格名称" prop="specsname"></el-table-column>

      <el-table-column label="规格属性" >
        <template slot-scope="item">
          <el-tag v-for="(attritem,index) of item.row.attrs" :key="index">{{attritem}}&nbsp;&nbsp;</el-tag>
        </template>
      </el-table-column>

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
            @click="$router.push('/specs/' + scope.row.id)"
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
export default {
  data() {
    return {
      arr: [],
      total:0,
      page:1
    };
  },

    mounted() {
    this.axios({url:'/api/specscount'}).then(res=>{
      this.total = res.data.list[0].total
    })
    this.getPageList();
  },

  methods: {
    getPageList(){
      this.axios.get('/api/specslist',{params:{size:5,page:this.page}}).then(res=>{
        this.arr = res.data.list;
      })
    },
    pageChange(n){
      this.page = n;
      this.getPageList();
    },
    del(scope) {
      this.$confirm("此操作将永久删除该规格, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          this.axios.post("/api/specsdelete", { id: scope.row.id }).then((res) => {
          
            if (res.data.code === 200) {
              this.arr = res.data.list;
              // this.arr.splice(scope.$index,1)
              
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