<template>
  <div>
    <h1>学生管理页面</h1>
    <el-table :data="tableData">
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    handleDelete(index) {
      this.tableData.splice(index,1)
    },
  },
  data() {
    return {
      tableData: [
        {
          date: "2021-01-13",
          name: "张大炮",
          address: "北京市朝阳区王四营乡中公教育五方桥基地",
        },
        {
          date: "2021-01-13",
          name: "张富贵",
          address: "北京市朝阳区王四营乡中公教育五方桥基地",
        },
        {
          date: "2021-01-13",
          name: "张哈哈",
          address: "北京市朝阳区王四营乡中公教育五方桥基地",
        },
        {
          date: "2021-01-13",
          name: "张老师",
          address: "北京市朝阳区王四营乡中公教育五方桥基地",
        },
      ],
    };
  },
};
</script>

<style>
</style>