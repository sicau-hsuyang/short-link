<template>
  <div class="home">
    <div class="home-search">
      <div class="search-control">
        <span class="search-control__label">短链码：</span>
        <el-input placeholder="搜索短链码" v-model.trim="search.code" />
      </div>
      <div class="search-control">
        <span class="search-control__label">是否投产：</span>
        <el-select placeholder="搜索投产状态" v-model.trim="search.isApply">
          <el-option :value="true" label="是"></el-option>
          <el-option :value="false" label="否"></el-option>
        </el-select>
      </div>
      <div class="search-control">
        <span class="search-control__label">状态：</span>
        <el-select placeholder="搜索状态" v-model.trim="search.state">
          <el-option :value="true" label="是"></el-option>
          <el-option :value="false" label="否"></el-option>
        </el-select>
      </div>
      <div class="search-control">
        <span class="search-control__label">创建时间：</span>
        <el-date-picker type="datetimerange" placeholder="搜索创建时间" value-format="YYYY/MM/DD hh:mm:ss" v-model.trim="search.createTime" />
      </div>
      <div class="search-control">
        <span class="search-control__label">开始生效时间：</span>
        <el-date-picker type="datetime" placeholder="搜索开始生效时间" value-format="YYYY/MM/DD hh:mm:ss" v-model.trim="search.beginTime" />
      </div>
      <div class="search-control">
        <span class="search-control__label">结束生效时间：</span>
        <el-date-picker type="datetime" placeholder="搜索结束生效时间" value-format="YYYY/MM/DD hh:mm:ss" v-model.trim="search.endTime" />
      </div>
    </div>
    <div class="home-operation">
      <div class="search-groups">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleClear">清空</el-button>
        <el-button class="btn-create" @click="handleCreateLink" type="success">创建短链</el-button>
      </div>
    </div>
    <el-table v-loading="loading" element-loading-text="Loading..." :data="tableData" border stripe style="width: 100%" empty-text="暂无数据">
      <el-table-column prop="uuid" label="短链码" align="center" width="150" />
      <el-table-column prop="isApply" label="是否投产" align="center" width="100">
        <template #default="{ row }">
          <a :href="generateTestAddress(row)" target="_blank">短链测试</a>
        </template>
      </el-table-column>
      <el-table-column prop="beginTime" label="开始生效时间" align="center" :formatter="(row, col, cellVal) => formatTime(cellVal)" />
      <el-table-column prop="endTime" label="结束生效时间" align="center" :formatter="(row, col, cellVal) => formatTime(cellVal)" />
      <el-table-column prop="status" label="状态" align="center" width="100" />
      <el-table-column prop="isApply" label="是否投产" align="center" width="60">
        <template #default="{ row }">
          <el-tag :type="row.isApply ? 'success' : 'danger'">{{ formatIsApply(row.isApply) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" :formatter="(row, col, cellVal) => formatTime(cellVal)" />
      <el-table-column prop="updateTime" label="最后更新时间" align="center" :formatter="(row, col, cellVal) => formatTime(cellVal)" />
      <el-table-column prop="createUser" label="创建人" align="center" />
      <el-table-column prop="updateUser" label="最后修改人" align="center" />
      <el-table-column label="操作" align="center" width="120">
        <template #default="{ row }">
          <el-button type="primary" :icon="Edit" circle @click="handleEdit(row)" />
          <el-button type="danger" :icon="Delete" circle @click="handleDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <div class="home-footer">
      <!-- eslint-disable-next-line -->
      <el-pagination @size-change="handleSizeChange" background layout="total, sizes, prev, pager, next, jumper" small v-model:current-page="pagination.pageNum" v-model:page-size="pagination.pageSize" :page-count="pagination.pageNum" :page-size="pagination.pageSize" :total="pagination.total" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { get } from "@/request";
import { useRouter } from "vue-router";
import { useFormatter } from "@/hooks";
import { Edit, Delete } from "@element-plus/icons-vue";
import { cloneDeep } from "lodash-es";
import { ref } from "vue";

let tableData = reactive([]);

const loading = ref(false);

const { formatTime } = useFormatter();

const pagination = reactive({
  total: 0,
  pageSize: 10,
  pageNum: 1,
});

const zeroSearch = {
  code: "",
  createTime: [null, null],
  beginTime: null,
  endTime: null,
};

const search = reactive(cloneDeep(zeroSearch));

async function getTableData() {
  loading.value = true;
  const { createTime, ...rest } = search;
  const resp = await get("/api/admin/list", {
    ...rest,
    beforeCreateTime: createTime[0],
    afterCreateTime: createTime[1],
    pageSize: pagination.pageSize,
    pageNum: pagination.pageNum,
  });
  loading.value = false;
  if (resp.code === 1) {
    pagination.total = resp.data.total;
    pagination.pageSize = resp.data.pageSize;
    pagination.pageNum = resp.data.pageNum;
    tableData = reactive(resp.data.list);
  }
}

function generateTestAddress(row) {
  return import.meta.env.VITE_SHORT_LINK_HOST + "/" + row.uuid;
}

function formatIsApply(v: boolean) {
  return v ? "是" : "否";
}

const router = useRouter();

function handleCreateLink() {
  router.push({
    name: "Detail",
  });
}

function handleSizeChange() {
  handleSearch();
}

function handleClear() {
  Object.assign(search, cloneDeep(zeroSearch));
  getTableData();
}

function handleSearch() {
  // 如果搜索条件不一样了的话，页数也回归到第一页
  getTableData();
}

function handleEdit(row) {}

onMounted(() => {
  getTableData();
});
</script>

<style lang="scss" scoped>
.home-search {
  display: flex;
  flex-wrap: wrap;

  .search-control {
    width: calc(20% - 20px);
    display: flex;
    margin-bottom: 20px;
    margin-right: 20px;
    align-items: center;

    &__label {
      min-width: 120px;
      text-align: right;
    }
  }

  .btn-create {
    width: 100px;
  }
}

.home-operation {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.home-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
