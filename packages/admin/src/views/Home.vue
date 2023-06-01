<template>
  <div class="home">
    <div class="home-search">
      <div class="search-control">
        <el-input  placeholder="搜索短链码" />
      </div>
      <el-button type="primary">搜索</el-button>
      <el-button>清空</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%" empty-text="暂无数据">
      <el-table-column prop="id" label="ID" align="center" width="100" />
      <el-table-column prop="uuid" label="短链码" align="center" width="150" />
      <el-table-column prop="expireTime" label="过期时间" align="center" />
      <el-table-column prop="status" label="状态" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column prop="updateTime" label="最后更新时间" align="center" />
      <el-table-column prop="deleteTime" label="删除时间" align="center" />
      <el-table-column prop="deleteTime" label="操作" align="center" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const tableData = reactive([]);
</script>

<style lang="scss" scoped>
.home-search {
  display: flex;
  margin-bottom: 20px;

  .search-control {
    width: 200px;
    &:last-child {
      margin-right: 20px;
    }
  }
}
</style>
