<template>
  <a-result status="403" title="403" sub-title="很抱歉, 您无权访问此页面！">
    <template #extra>
      <a-button type="primary">Back Home</a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: '403',
  isRouter: true,
  isComponents: true,
  setup() {
    return{}
  }
})
</script>

<style></style>