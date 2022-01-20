<template>
  <p @click="onChangeContents('../views/test/a.vue')">a</p>
  <p @click="onChangeContents('../views/test/b.vue')">b</p>
  <Suspense>
    <keep-alive>
      <component
        :is="
          DefineAsyncComponent({
            // 工厂函数
            loader: Modeuls[currentTabComponent],
            // // 默认值：Infinity（即永不超时，单位 ms）
            timeout: 3000,
          })
        "
      ></component>
    </keep-alive>
  </Suspense>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, ref } from "vue";
import { _getModules, _getComponents } from "../../services/global";
export default defineComponent({
  name: "test",
  isRouter: true,
  isComponents: true,
  setup() {
    //vite加载指定路径的所有模块
    const Modeuls = _getModules();
    console.log(Modeuls.length);
    const onChangeContents = function (URL: string) {
      currentTabComponent.value = URL;
    };
    let currentTabComponent = ref("../views/test/a.vue");
    const DefineAsyncComponent = defineAsyncComponent;
    return {
      DefineAsyncComponent,
      currentTabComponent,
      onChangeContents,
      Modeuls,
    };
  },
});
</script>