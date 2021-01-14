<template>
  <el-container class="page">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="150px"
        ><el-menu
          default-active=""
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/student">学生管理</el-menu-item>
            <el-menu-item index="/course">课程管理</el-menu-item>
            
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
export default {};
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}
.el-header {
  background: skyblue;
}
.el-aside{
    background: #545c64;
}
.el-submenu .el-menu-item{
    min-width: 150px;
}
</style>