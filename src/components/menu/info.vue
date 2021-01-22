<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/menu'}">菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单{{tip}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 
        model  要验证的数据
        rules  验证规则
        ref  可以通过dom操作来实现调用组件的属性和方法
     -->
    <el-form
      :model="info"
      :rules="rules"
      ref="menuform"
      style="width: 400px"
      label-width="80px"
    >
      <!-- prop属性是rulus验证规则中的键名 -->
      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="info.pid" @change="pidChange">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option
            v-for="menuitem in menuarr"
            :key="menuitem.id"
            :label="menuitem.title"
            :value="menuitem.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop="title">
        <el-input placeholder="请输入菜单名称" v-model="info.title"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="info.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标" v-show="info.type == 1">
        <el-input placeholder="请输入菜单图标" v-model="info.icon"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" v-show="info.type == 2">
        <el-input placeholder="请输入菜单地址" v-model="info.url"></el-input>
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
// import axios from "axios";
export default {
  data() {
    return {
      tip: "添加",
      info: {
        pid: "",
        title: "",
        type: 1,
        icon: "",
        url: "",
        status: true,
      },
      rules: {
        pid: [{ required: true, message: "请选择上级菜单" }],
        title: [
          { required: true, message: "请输入菜单名称" },
          { min: 3, max: 20, message: "菜单名称应该在3-20个字符之间" },
        ],
      },
      menuarr: [],
    };
  },
  mounted() {
    //如果动态路由携带了参数，则认为是编辑页面
    if (this.$route.params.id) {
      this.tip = "编辑";
      //如果是编辑操作，则通过接口获取菜单详情
      this.axios.get("/api/menuinfo", { params: { id: this.$route.params.id } })
        .then((res) => {
          this.info = res.data.list;
        });
    }

    this.axios.get("/api/menulist?pid=0").then((res) => {
      this.menuarr = res.data.list;
    });
  },
  methods: {
    submit() {
      //required:true必填项  message 提示信息
      this.$refs["menuform"].validate((val) => {
        if (val) {
          //验证成功
          //调用接口，完成数据的添加操作
          var url = "/api/menuadd";
          if (this.$route.params.id) {
            url = "/api/menuedit";
            this.info.id = this.$route.params.id;
          }
          this.axios.post(url, this.info).then((res) => {
            if (res.data.code === 200) {
              this.$router.push("/menu");
            }
          });
        }
      });
    },
    pidChange(n) {
      this.info.type = n == 0 ? 1 : 2;
    },
  },
};
</script>

<style>
</style>