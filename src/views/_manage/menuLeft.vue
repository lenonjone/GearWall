// 左侧菜单组件（配合主页签共同加载）
<template>
  <a-layout>
    <!-- 菜单栏 -->
    <a-layout-sider
      width="200"
      style="background: #001529"
      v-model:collapsed="collapsed"
    >
      <!-- 收缩按钮 -->
      <div style="text-align: right; background: #001529">
        <a-button
          type="primary"
          style="
            margin-bottom: 4px;
            background: #ff8100;
            width: 30px;
            border-color: #ff8100;
          "
          @click="toggleCollapsed"
        >
          <icon-font :type="collapsed ? 'gear-menuflod' : 'gear-menuflod_'" />
        </a-button>
      </div>

      <!-- 菜单 -->
      <div class="sider">
        <a-menu mode="inline" theme="dark">
          <template v-for="item in list">
            <template v-if="!item.children">
              <a-menu-item :key="item.key" @click="addPanes(item.key)">
                <icon-font :type="item.icon" />
                <span>{{ item.title }}</span>
              </a-menu-item>
            </template>
            <template v-else>
              <a-sub-menu :key="item.key">
                <template v-slot:title
                  ><icon-font :type="item.icon" /><span>{{
                    item.title
                  }}</span></template
                >
                <template v-for="s_item in item.children">
                  <template v-if="!s_item.children">
                    <a-menu-item
                      :key="s_item.key"
                      @click="addPanes(s_item.key)"
                    >
                      <icon-font :type="item.icon" />
                      <span>{{ s_item.title }}</span>
                    </a-menu-item>
                  </template>
                  <template v-else>
                    <a-sub-menu :key="s_item.key">
                      <template v-slot:title
                        ><icon-font :type="item.icon" /><span>{{
                          s_item.title
                        }}</span></template
                      >
                      <template v-for="s_s_item in item.children">
                        <template v-if="s_s_item.children">
                          <a-menu-item
                            :key="s_s_item.key"
                            @click="addPanes(s_s_item.key)"
                          >
                            <icon-font :type="item.icon" />
                            <span>{{ s_s_item.title }}</span>
                          </a-menu-item>
                        </template>
                      </template>
                    </a-sub-menu>
                  </template>
                </template>
              </a-sub-menu>
            </template>
          </template>
        </a-menu>
      </div>
    </a-layout-sider>
    
    <!-- 内容 -->
    <a-layout-content
      :style="{
        padding: '5px 10px 0px 10px',
        background: '#fff',
      }"
    >
      <main-tabs ref="ctrlTabs" style="margin-bottom: 20px"></main-tabs>
    </a-layout-content>
  </a-layout>
  
</template>

<script>
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";

export default defineComponent({
  name: "menuLeft",
  isRouter: true,
  isComponents: true,
  setup() {
    const state = reactive({
      collapsed: false,
    });

    const list = [
      {
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },{
        key: "1",
        title: "菜单A",
        icon: "gear-global",
      },
      {
        key: "2",
        title: "菜单B",
        icon: "gear-global",
        children: [
          {
            key: "2.1",
            title: "菜单B1",
            icon: "gear-global",
            children: [
              {
                key: "2.1.1",
                title: "菜单B1.1",
                icon: "gear-global",
              },
            ],
          },
          {
            key: "3",
            title: "菜单C",
            icon: "gear-global",
          },
        ],
      },
    ];

    // 菜单收展事件
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
    };

    // 子组件mainTabs 控制事件
    const ctrlTabs = ref(null);
    const addPanes = (key) => {
      ctrlTabs.value.add(key);
      ctrlTabs.value.navigation(key);
    };

    return {
      ...toRefs(state),
      toggleCollapsed,
      list,
      addPanes,
      ctrlTabs,
    };
  },
});
</script>
<style>
.sider {
  overflow-y: auto;
  height: 700px;
}

.sider::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.sider::-webkit-scrollbar-track {
  background-color: #001529;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
.sider::-webkit-scrollbar-thumb {
  background-color: #ff8100;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
</style>