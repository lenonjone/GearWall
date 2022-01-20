<template>
  <a-space size="small">
    <a-button style="background-color: #1890ff; color: #fff">新增</a-button>
    <a-button style="background-color: #ff8100; color: #fff">保存</a-button>
    <a-button style="background-color: #ff4d4f; color: #fff">删除</a-button>
  </a-space>
  <icon-font style="width: 50px" type="gear-shu" />
  <a-space size="small">
    <a-button style="background-color: #1890ff; color: #fff"
      >自定义方法A</a-button
    >
    <a-button style="background-color: #ff8100; color: #fff"
      >自定义方法B</a-button
    >
  </a-space>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "controlBox",
  isRouter: false,
  isComponents: true,
  setup() {
    return {};
  },
});
</script>
