<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }"
        >管理员管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>管理员{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="info"
      :rules="rules"
      ref="form"
      style="width: 400px"
      label-width="80px"
    >
      <el-form-item label="所属角色" prop="roleid">
        <el-select v-model="info.roleid">
          <el-option
            v-for="roleitem in rolearr"
            :key="roleitem.id"
            :label="roleitem.rolename"
            :value="roleitem.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="管理员名" prop="username">
        <el-input
          placeholder="请输入管理员名称"
          v-model="info.username"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入管理员密码"
          v-model="info.password"
        ></el-input>
        <span v-if="$route.params.id">密码留空则不修改</span>
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
        roleid: "",
        username: "",
        password: "",
        status: true,
      },
      rules: {
        roleid: [{ required: true, message: "请选择" }],
        username: [
          { required: true, message: "请输入管理员名称" },
          { min: 3, max: 20, message: "管理员名称应该在3-20个字符之间" },
        ],
      },
      rolearr: [],
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.tip = "编辑";

      this.axios({
        url: "/api/userinfo",
        params: { uid: this.$route.params.id },
      }).then((res) => {
        (this.info = res.data.list), (this.info.password = "");
      });
    }
    this.axios({
      url: "/api/rolelist",
      method: "get",
    }).then((res) => {
      this.rolearr = res.data.list;
    });
  },
  methods: {
    submit() {
      this.$refs["form"].validate((val) => {
        if (val) {
          var url = "/api/useradd";
          if (this.$route.params.id) {
            url = "/api/useredit";
            this.info.id = this.$route.params.id;
          }

          this.axios({
            url,
            method: "post",
            data: this.info,
          }).then((res) => {
            if (res.data.code === 200) {
              this.$router.push("/user");
            }else{
              this.$message(res.data.msg)
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>