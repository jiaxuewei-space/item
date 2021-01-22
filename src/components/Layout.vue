<template>
  <el-container class="page">
    <el-header>
      <span class="fl"
        >小U商城后台管理系统
        <el-button type="primary" size="mini" @click="iscollapse = !iscollapse">
          <i
            :class="{
              'el-icon-s-fold': !iscollapse,
              'el-icon-s-unfold': iscollapse,
            }"
          ></i>
        </el-button>
      </span>
      <span class="fr">
        欢迎：{{ $store.state.userinfo ? $store.state.userinfo.username : "" }}
        <a href="javascript:void(0);" @click="logout">退出</a>
      </span>
    </el-header>
    <el-container>
      <el-aside :style="styleA"
        ><el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
          :collapse="iscollapse"
        >
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu v-for="item in menus" :key="item.id" :index="item.title">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="subitem in item.children"
              :key="subitem.id"
              :index="subitem.url"
              >{{ subitem.title }}</el-menu-item
            >
          </el-submenu>
        </el-menu></el-aside
      >
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
      defaultActive: "",
      iscollapse: false,
      styleA: { width: 150 },
    };
  },
  mounted() {
    this.defaultActive = this.$route.meta.selected;
    this.menus = this.$store.state.userinfo.menus;
  },
  watch: {
    $route(newVal) {
      this.defaultActive = newVal.meta.selected;
    },
  },
  methods: {
    logout() {
      this.$store.commit("setUserInfo", null);
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}
.el-header {
  background: skyblue;
}
/* .el-aside {
  background: #545c64;
} */
.el-submenu .el-menu-item {
  min-width: 150px;
}
.el-menu {
  height: 100%;
}
.el-menu:not(.el-menu--collapse) {
  width: 149px;
}
.el-header {
  color: white;
  font-weight: bold;
  line-height: 60px;
}
.fr {
  position: absolute;
  right: 20px;
}
.fr a {
  margin-left: 10px;
  text-decoration: none;
  background: red;
  padding: 5px 13px;
  color: #fff;
  border-radius: 5px;
}
</style>