<template>
  <div class="home">
    <div class="home-search">
      <div class="search-control">
        <span class="search-control__label">短链码：</span>
        <el-input placeholder="搜索短链码" />
      </div>
      <div class="search-control">
        <span class="search-control__label">创建时间：</span>
        <el-input placeholder="搜索创建时间" />
      </div>
      <div class="search-control">
        <span class="search-control__label">开始时间：</span>
        <el-input placeholder="搜索有效开始时间" />
      </div>
      <div class="search-control">
        <span class="search-control__label">结束时间：</span>
        <el-input placeholder="搜索有效结束时间" />
      </div>
      <div class="search-groups">
        <el-button type="primary">搜索</el-button>
        <el-button>清空</el-button>
        <el-button class="btn-create" @click="handleCreateLink" type="success">创建短链</el-button>
      </div>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%" empty-text="暂无数据">
      <el-table-column prop="id" label="ID" align="center" width="100" />
      <el-table-column prop="uuid" label="短链码" align="center" width="150" />
      <el-table-column prop="beginTime" label="有效开始时间" align="center" :formatter="(row, col, cellVal) => formatTime(cellVal)" />
      <el-table-column prop="endTime" label="有效开始时间" align="center" :formatter="(row, col, cellVal) => formatTime(cellVal)" />
      <el-table-column prop="status" label="状态" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" :formatter="(row, col, cellVal) => formatTime(cellVal)" />
      <el-table-column prop="updateTime" label="最后更新时间" align="center" :formatter="(row, col, cellVal) => formatTime(cellVal)" />
      <el-table-column prop="deleteTime" label="删除时间" align="center" :formatter="(row, col, cellVal) => formatTime(cellVal)" />
      <el-table-column prop="createUser" label="创建人" align="center" />
      <el-table-column prop="updateUser" label="最后修改人" align="center" />
      <el-table-column label="操作" align="center" />
    </el-table>
    <div class="home-footer">
      <el-pagination background layout="prev, pager, next" :page-count="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.total" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { get } from "@/request";
import { useRouter } from "vue-router";
import { useFormatter } from "@/hooks";

let tableData = reactive([]);

const { formatTime } = useFormatter();

const pagination = reactive({
  total: 0,
  pageSize: 10,
  pageNum: 1,
});

async function getTableData() {
  const resp = await get("/api/admin/list");
  if (resp.code === 1) {
    pagination.total = resp.data.total;
    pagination.pageSize = resp.data.pageSize;
    pagination.pageNum = resp.data.pageNum;
    tableData = reactive(resp.data.list);
  }
}

const router = useRouter();

function handleCreateLink() {
  router.push({
    name: "Detail",
  });
}

onMounted(() => {
  getTableData();
});
</script>

<style lang="scss" scoped>
.home-search {
  display: flex;
  margin-bottom: 20px;

  .search-control {
    min-width: 200px;
    display: flex;
    margin-right: 20px;
    align-items: center;

    &__label {
      min-width: 100px;
      text-align: right;
    }
  }

  .btn-create {
    width: 100px;
  }
}

.home-footer {
  margin-top: 20px;
}
</style>
