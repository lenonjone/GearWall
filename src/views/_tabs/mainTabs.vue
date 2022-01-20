// 主页签组件（配合左侧菜单共同加载）
<template>
  <a-tabs v-model:activeKey="activeKey.data" type="line" @change="callback">
    <a-tab-pane v-for="pane in panes" :key="pane.key">
      <template #tab>
        <span>
          {{ pane.title }}
          <span
            :style="
              pane.closable == '0' ? 'display:none' : 'padding: 0 0 0 5px'
            "
            ><icon-font type="gear-delete" @click="remove(pane.key)"
          /></span>
        </span>
      </template>
      <div class="sider_c" :style="{ height: screenHeight.data }">
        <content-center></content-center>
      </div>
    </a-tab-pane>
    <template #tabBarExtraContent>
      <a-dropdown :trigger="['click']">
        <icon-font type="gear-closetool" style="padding: 0 10px 0 0" />
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">关闭左侧</a-menu-item>
            <a-menu-item key="2">关闭右侧</a-menu-item>
            <a-menu-item key="3">关闭其他</a-menu-item>
            <a-menu-divider />
            <a-menu-item key="4" style="color: red">关闭所有</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
  </a-tabs>
</template>

<script>

import { defineComponent, reactive, ref,onMounted } from "vue";

export default defineComponent({
  name: "mainTabs",
  isRouter: false,
  isComponents: true,
  setup() {
    const screenHeight = reactive({
      data: document.body.clientHeight - 205 + "px"
    });
    const panes = ref([
      {
        title: "首页",
        key: "0",
        closable: "0",
      },
    ]);

    onMounted(() => {
      //  window.addEventListener = ('resize',() => {
      //   debugger
      //   return (() => {
      //     screenHeight.data = document.body.clientHeight - 205 + "px";
      //   })();
      // },true);
    });

    const activeKey = reactive({ data: panes.value[0].key });
    let changeMod = "default";
    let lastKey = "0";

    // tab变更后回调事件
    const callback = () => {
      if (changeMod === "remove") {
        activeKey.data = lastKey;
      }
      changeMod = "default";
    };

    // 父组件菜单定位对应tab事件
    const navigation = (key) => {
      activeKey.data = key;
    };

    // 当前tab内容刷新事件
    const refresh = () => {
      alert(1);
    };

    // 新增tab事件
    const add = (key) => {
      let look = true;
      panes.value.forEach((pane) => {
        if (pane.key === key) {
          look = false;
          return;
        }
      });
      if (look) {
        activeKey.value = key;
        panes.value.push({
          title: "新建页面" + key,
          key: activeKey.value,
        });
      }
    };

    // 移除tab事件
    const remove = (targetKey) => {
      changeMod = "remove";
      lastKey = activeKey.data;
      if (lastKey === targetKey) {
        lastKey = "0";
      }
      panes.value = panes.value.filter((pane) => pane.key !== targetKey);
      activeKey.data = lastKey;
    };

    return {
      panes,
      screenHeight,
      activeKey,
      refresh,
      remove,
      add,
      callback,
      navigation,
    };
  },

  components: {  },
});
</script>
<style>
.sider_c {
  overflow-y: auto;
  width: 100%;
  position: relative;
  background: #fff;
}

.sider_c::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.sider_c::-webkit-scrollbar-track {
  background-color: #fff;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.sider_c::-webkit-scrollbar-thumb {
  background-color: #fff;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
</style>