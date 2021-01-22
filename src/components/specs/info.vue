<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">规格管理</el-breadcrumb-item>
      <el-breadcrumb-item>规格{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="info"
      :rules="rules"
      ref="form"
      style="width: 400px"
      label-width="80px"
    >
      <el-form-item label="规格名称" prop="specsname">
        <el-input
          placeholder="请输入规格名称"
          v-model="info.specsname"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="规格属性"
        v-for="(item, index) in attrArr"
        :key="index"
        v-show="index<5"
      >
        <div class="attritem">
          <el-input
            placeholder="请输入规格属性值"
            v-model="item.value"
          ></el-input>
          <el-button v-if="index == 0" type="primary" @click="addattr"
            >增加</el-button
          >
          <el-button v-else type="danger" @click="delattr(index)"
            >删除</el-button
          >
        </div>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch
          v-model="info.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tip: "添加",
      info: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        roleid: [{ required: true, message: "请选择" }],
        specsname: [
          { required: true, message: "请输入规格名称" },
          { min: 3, max: 20, message: "规格名称应该在3-20个字符之间" },
        ],
      },
      attrArr: [{ value: "" }],
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.tip = "编辑";

      this.axios({url: "/api/specsinfo",params: { id: this.$route.params.id },
      }).then((res) => {
      this.info = res.data.list[0],
      this.attrArr = [];
        this.info.attrs.map((d,i)=>{
          this.attrArr.push({value:d})
        })
      });
    
    }
  },
  methods: {
    addattr() {
      this.attrArr.push({ value: "" });
    },
    delattr(index) {
      this.attrArr.splice(index, 1);
    },
    submit() {
      // this.$refs['form'].validate((val)=>{
      //   if(val){
      //     var url = '/specsadd';
      //     if(this.$route.params.id){
      //       url = '/api/specsedit'
      //       this.info.id = this.$route.params.id


      var temparr = [];
      this.attrArr.map((item) => {
        temparr.push(item.value);
      });
      this.info.attrs = temparr.join(",");
      this.axios.post("/api/specsadd", this.info).then((res) => {
        if (res.data.code === 200) {
          this.$router.push("/specs");
        } else {
          this.$message(res.data.msg);
        }
      });



      //     }
      //   }
      // })


    },
  },
};
</script>

<style scoped>
.attritem {
  display: flex;
}

</style>