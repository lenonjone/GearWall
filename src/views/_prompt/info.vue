<template>
  <a-result title="Your operation has been executed">
    <template #extra>
      <a-button key="console" type="primary">Go Console</a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: 'info',
  isRouter: true,
  isComponents: true,
  setup() {
    return{}
  }
})
</script>

<style></style>

