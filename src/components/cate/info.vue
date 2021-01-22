<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/cate' }">分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="info"
      :rules="rules"
      ref="form"
      style="width: 400px"
      label-width="80px"
    >
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="info.pid">
          <el-option label="顶级分类" :value="0"></el-option>

          <el-option v-for="item in arr" :key="item.id" :label="item.catename" :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input placeholder="请输入分类名称" v-model="info.catename"></el-input>
      </el-form-item>
      <el-form-item label="图片" v-show="info.pid!=0">

        <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-change="fileChange" :file-list="fileList">
          <i slot="default" class="el-icon-plus"></i>

          <div slot="file" slot-scope="{ file }">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
            <span class="el-upload-list__item-actions">

              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              
              <span class="el-upload-list__item-delete" @click="handlePictureDel">
                <i class="el-icon-delete"></i>
              </span>

            </span>
          </div>

        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>

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
    dialogVisible:false,
    dialogImageUrl:'',
      tip: "添加",
      info: {
        pid: "",
        catename: "",
        img:'',
        status: true,
      },
      rules: {
        pid: [{ required: true, message: "请选择上级分类" }],
        catename: [
          { required: true, message: "请输入分类名称" },
          { min: 3, max: 20, message: "分类名称应该在3-20个字符之间" },
        ],
      },
      arr: [],
      fileList:[]
    };
  },
  mounted() {
    //如果动态路由携带了参数，则认为是编辑页面
    if (this.$route.params.id) {
      this.tip = "编辑";
      //如果是编辑操作，则通过接口获取分类详情
      this.axios.get("/api/cateinfo", { params: { id: this.$route.params.id } }).then((res) => {
          this.info = res.data.list;
          this.fileList = [{url:this.info.img}]
        });
    }

    this.axios.get("/api/catelist?pid=0").then((res) => {
      this.arr = res.data.list;
    });
  },
  methods: {
      handlePictureCardPreview(file){
          this.dialogImageUrl = file.url;
          this.dialogVisible = true
      },
        handlePictureDel(){
           this.fileList = []
       },
       fileChange(file){
           this.info.img = file.raw;
       },
    submit() {
      //required:true必填项  message 提示信息
      this.$refs["form"].validate((val) => {
        if (val) {
          //验证成功
          //调用接口，完成数据的添加操作
          var url = "/api/cateadd";
          if (this.$route.params.id) {
            url = "/api/cateedit";
            this.info.id = this.$route.params.id;
          }
          var data = new FormData();//生成一个空的表单
          for(let i in this.info){
               data.append(i,this.info[i]);
          }
         
          this.axios.post(url, data).then((res) => {
            if (res.data.code === 200) {
              this.$router.push("/cate");
            }
          });
        }
      });
    },
  },
};
</script>

<style>
</style>