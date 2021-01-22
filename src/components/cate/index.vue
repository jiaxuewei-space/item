<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" @click="$router.push('/cate/add')">添加</el-button>
    <el-table :data="arr" row-key="id">
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="分类名称" prop="catename"></el-table-column>

      <el-table-column label="图片">
        <template slot-scope="item" v-if="item.row.img">
          <img style="width: 100px" :src="item.row.img" alt="" />
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
            @click="$router.push('/cate/' + scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
    };
  },

  methods: {
    del(obj) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {this.axios.post("/api/catedelete", { id: obj.row.id }).then((res) => {
            if (res.data.code === 200) {
              this.arr = res.data.list;
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
        .catch(() => {});
    },
  },
  mounted() {
    this.axios.get("/api/catelist", { params: { istree: true } }).then((res) => {
        this.arr = res.data.list;
      });
  },
};
</script>

<style scoped>

</style>