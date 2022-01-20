<template>
  <div style="height: 100%">
    <div
      :style="{
        background: '#ececec',
        padding: '10px 5px 0 5px',
        display: searchDisplay,
      }"
    >
      <search-box />
    </div>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      :pagination="pagination"
    >
      <template #action>
        <a>详情</a>
      </template>
    </a-table>
    <div
      :style="{
        height: '50px',
        background: '#fafafa',
        padding: '13px 0 0 5px',
        display: controlDisplay,
      }"
    >
      <control-box />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
const searchDisplay = "";
const controlDisplay = "";

const columns = [
  { title: "文章",width: 100,dataIndex: "name",key: "name",fixed: "left"},
  { title: "名称", width: 100, dataIndex: "age", key: "age", fixed: "left" },
  { title: "字段 1", dataIndex: "address", key: "1", width: 150 },
  { title: "字段 2", dataIndex: "address", key: "2", width: 150 },
  { title: "字段 3", dataIndex: "address", key: "3", width: 150 },
  { title: "字段 4", dataIndex: "address", key: "4", width: 150 },
  { title: "字段 5", dataIndex: "address", key: "5", width: 150 },
  { title: "字段 6", dataIndex: "address", key: "6", width: 150 },
  { title: "字段 7", dataIndex: "address", key: "7", width: 150 },
  { title: "字段 8", dataIndex: "address", key: "8", width: 150 },
  { title: "Action",key: "operation",fixed: "right",width: 100,slots: { customRender: "action" },},
];

interface DataItem {
  key: number;
  name: string;
  age: string;
  address: string;
}

const data: DataItem[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `文章 ${i}`,
    age: `第 ${i} 章`,
    address: `数据 ${i}`,
  });
}

export default defineComponent({
  name: "simpleTable",
  isRouter: false,
  isComponents: true,
  components: {},
  data() {
    return {
      data,
      columns,
      searchDisplay,
      controlDisplay,
      pagination: {
        pageSize: 10, // 默认每页显示数量
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ["10", "20", "30", "40", "50"], // 每页数量选项
        size: "small",
        showQuickJumper: true,
      },
    };
  },
});
</script>
<style>
.ant-input-number-input {
  text-align: center;
}
.ant-table-body {
  overflow-x: auto;
  width: 100%;
  position: relative;
  background: #fff;
}

.ant-table-body::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.ant-table-body::-webkit-scrollbar-track {
  background-color: #fff;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.ant-table-body::-webkit-scrollbar-thumb {
  background-color: #9e9999;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
</style>

