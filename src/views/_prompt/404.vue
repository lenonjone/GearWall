<template>
  <a-result status="404" title="404" sub-title="很抱歉，您访问的页面不存在！">
    <template #extra>
      <a-button type="primary">Back Home</a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: '404',
  isRouter: true,
  isComponents: true,
  setup() {
    return{}
  }
})
</script>

<style></style>