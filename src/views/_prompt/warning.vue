<template>
  <a-result status="warning" title="There are some problems with your operation.">
    <template #extra>
      <a-button key="console" type="primary">Go Console</a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: 'warning',
  isRouter: true,
  isComponents: true,
  setup() {
    return{}
  }
})
</script>

<style></style>

