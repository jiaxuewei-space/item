<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" @click="$router.push('/goods/add')">添加</el-button>
    <el-table :data="arr"  border stripe>
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column label="一级菜单" prop="firstcatename" width="150px"></el-table-column>
      <el-table-column label="二级菜单" prop="secondcatename" width="150px"></el-table-column>
      <el-table-column label="商品名称" prop="goodsname" width="300px"></el-table-column>
      <el-table-column label="商品价格" prop="price" width="200px"></el-table-column>
      <el-table-column label="市场价格" prop="market_price" width="200px"></el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.isnew==1" type="success">是</el-tag>
          <el-tag effect="dark" v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.ishot==1" type="success">是</el-tag>
          <el-tag effect="dark" v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.status == 1" type="success">上架</el-tag>
          <el-tag effect="dark" v-else type="danger">下架</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200" fixed="right">
        <template slot-scope="item">
          <el-button size="mini" type="primary" @click="$router.push('/goods/' + item.row.id)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="del(item.row.id)">删除</el-button> -->
          <el-button size="mini" type="danger" @click="del(item)">删除</el-button>
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
      // goodsarr:[],
      arr: [],
      total:0,
      page:1
    };
  },

  mounted() {
    this.axios({url:'/api/goodscount'}).then(res=>{
      this.total = res.data.list[0].total
    })
    this.getPageList();
  },

  methods: {
    getPageList(){this.axios.get('/api/goodslist',{params:{size:5,page:this.page}}).then(res=>{
        this.arr = res.data.list;
        
      })
    },
    pageChange(n){
      this.page = n;
      this.getPageList();
    },
    del(scope){this.$confirm("此操作将永久删除该商品管理, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {this.axios.post("/api/goodsdelete", { id: scope.row.id }).then((res) => {
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