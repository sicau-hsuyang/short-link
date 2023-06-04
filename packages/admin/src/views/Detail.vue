<template>
  <div class="detail">
    <h2>短链码生成</h2>
    <el-form :model="form" label-width="120px">
      <el-form-item label="跳转地址">
        <el-input v-model="form.link" placeholder="请输入跳转地址" />
      </el-form-item>
      <el-form-item label="投放类型">
        <el-select v-model="form.putType" placeholder="请选择投放类型" class="form-control">
          <el-option v-for="item in putTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="开始生效时间">
        <el-date-picker class="form-control" type="datetime" v-model="form.beginTime" placeholder="请选择生效开始时间" />
      </el-form-item>
      <el-form-item label="生效截止时间">
        <el-date-picker class="form-control" type="datetime" v-model="form.endTime" placeholder="请选择生效截止时间" />
      </el-form-item>
      <el-form-item label="关联数据">
        <el-form-item class="btn-row">
          <el-button type="primary" @click="addRow">添加数据</el-button>
        </el-form-item>
        <el-form ref="metaFormRef" :model="metaForm" label-width="80px">
          <el-form-item class="form-row" :label="'Key-Value' + (metaIdx + 1)" :prop="'items.' + meta.key + '.value'" v-for="(meta, metaIdx) in metaForm.items" :key="meta.key">
            <div class="key-value-row">
              <el-input class="key-value-input" v-model="meta.prop" placeholder="请输入属性名" />
              <el-input class="key-value-input" v-model="meta.value" placeholder="请输入属性值" />
              <el-button type="danger" @click="handleDeleteRow(metaIdx)">删除</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="立即应用">
        <el-radio-group v-model="form.isApply">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">创建</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { PutTypeEnum, PutTypeOptions } from "@/config";
import { reactive, ref } from "vue";
import { post, put } from "@/request";
import { useMessage } from "@/hooks";
import { cloneDeep } from "lodash-es";
import { useRouter } from "vue-router";

const zeroForm = {
  link: "",
  putType: PutTypeEnum.H5,
  beginTime: "",
  endTime: "",
  isApply: false,
};
const message = useMessage();
const router = useRouter();
const form = reactive(cloneDeep(zeroForm));

const metaForm = reactive<{ items: Array<{ prop: string; value: string; key: number }> }>({
  items: [],
});

let idx = ref(0);

const putTypeOptions = reactive(PutTypeOptions);

function addRow() {
  metaForm.items.push({
    prop: "",
    value: "",
    key: idx.value++,
  });
}

function handleDeleteRow(delIdx: number) {
  metaForm.items.splice(delIdx, 1);
}

function handleCancel() {
  Object.assign(form, cloneDeep(zeroForm));
  metaForm.items = [];
  idx.value = 0;
}

async function submit() {
  const resp = await put(
    "/api/admin/save",
    {
      ...form,
      dictionary: metaForm.items,
    },
    {
      json: true,
    }
  );
  if (resp.code === 1) {
    message({
      message: "保存成功!",
      type: "success",
    });
    router.push({
      name: "Home",
      replace: true,
    });
  }
}
</script>

<style lang="scss" scoped>
.detail {
  width: 800px;
  margin: 0 auto;
}

:deep(.form-control) {
  width: 100% !important;
}

.btn-row {
  margin-bottom: 20px;
  width: 100%;
}

.key-value-row {
  display: flex;
}

.key-value-input {
  margin-right: 20px;
}

.form-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
