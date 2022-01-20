<!-- 框架主要组件-->
<template>
  <a-layout id="components">
    <!-- ==================================================================顶部 -->
    <a-layout-header class="header">
      <!-- 顶部Logo区域 -->
      <div class="logo" style="text-align: center">GearBoot</div>
      <!-- 顶部模块区域 -->
      <div class="barmenu">
        <a-menu theme="dark" mode="horizontal" v-model:selectedKeys="current">
          <a-menu-item
            v-for="item in list"
            :key="item.key"
            @click="onChangeContents(item.key)"
          >
            <span>{{ item.name }}</span>
          </a-menu-item>
        </a-menu>
      </div>
      <!-- 顶部用户信息区域 -->
      <div class="baruser">
        <span style="margin-right: 20px">
          <icon-font
            :type="isfull > 0 ? 'gear-full_' : 'gear-full'"
            @click="toggleFullscreen"
          />
        </span>
        <span><user-info /></span>
      </div>
    </a-layout-header>
    <!-- ===================================================================== -->

    <!-- ==================================================================中部 -->
    <a-layout>
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

    </a-layout>
    <!-- ===================================================================== -->
     <a-layout>
    <footer-info
        style="background: #001529; padding: 15px 10px 0 15px; height: 50px;"
      ></footer-info>
  </a-layout>
  </a-layout>
</template>
<script>
import { defineComponent, ref, reactive, defineAsyncComponent } from "vue";
import { _getModules, _getComponents } from "../../services/global";
import screenfull from "screenfull";
export default defineComponent({
  setup() {
    const state = reactive({
      isfull: 1,
    });

    const list = [
      {
        key: "1",
        value: "_manage/menuLeft.vue",
        name: "中控平台",
      },
      {
        key: "2",
        value: "_prompt/403.vue",
        name: "接口控制",
      },
      {
        key: "3",
        value: "_prompt/404.vue",
        name: "系统管理",
      },
      {
        key: "4",
        value: "_prompt/500.vue",
        name: "脚本编辑",
      },
      {
        key: "5",
        value: "_prompt/success.vue",
        name: "配置管理",
      },
      {
        key: "6",
        value: "_prompt/failed.vue",
        name: "服务管理",
      },
    ];
    let current = ref([list[0].key]);
    const toggleFullscreen = () => {
      state.isfull = state.isfull == 0 ? 1 : 0;
      if (screenfull.isEnabled) {
        screenfull.toggle();
      }
    };
    //vite加载指定路径的所有模块
    const Modeuls = _getModules();
    let currentTabComponent = ref("../views/" + list[0].value);
    const onChangeContents = (key) => {
      current = ref([key]);
      currentTabComponent.value =
        "../views/" + list.find((i) => i.key == key).value;
    };
    const DefineAsyncComponent = defineAsyncComponent;
    return {
      current,
      DefineAsyncComponent,
      currentTabComponent,
      onChangeContents,
      Modeuls,
      list,
      toggleFullscreen,
    };
  },
});
</script>

<style>
#components{
  min-height:100%;
}
#components .logo {
  width: 160px;
  height: 50px;
  margin: 0 28px 16px 0;
  float: left;
  font-size: 18px;

  /* font-family: "Courier New", Courier, monospace; */
  font-weight: 600;
  color: azure;
  text-align: center;
}
#components .barmenu {
  float: left;
}
#components .baruser {
  float: right;
  font-size: 16px;
  color: #fff;
  line-height: 64px;
}
#components .header {
  padding: 0 20px;
}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item,
.ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu {
  top: 0;
  margin-top: 0px;
  height: 50px;
  padding: 0px 12px 0px;
  border-color: #001529;
  border-bottom: 0;
}
</style>
