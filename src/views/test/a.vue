

<template>这里是a模板</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: 'atest',
  isRouter: false,
  isComponents: true,
  setup() {
    console.log(1);
    return{}
  }
})
</script>

<style></style>
