// 用户信息组件（固定在frame上）
<template>
  <div style="float: right;">
    <span style="margin-right: 20px">
      <a-popover placement="bottomRight">
        <template #content>
          <p>Content</p>
        </template>
        <template #title>
          <span>您有 {{ noticeNumber }} 条消息！</span>
        </template>
        <icon-font :type="noticeNumber > 0 ? 'gear-notice_' : 'gear-notice'" />
      </a-popover>
    </span>
    <a-dropdown>
      <div
        style="
          float: right;
          background-color: #ff8100;
          padding: 0 10px 0 10px;
          height: 55px;
        "
      >
        <span style="margin-right: 15px">
          <a-avatar
            style="border: 1px solid #fff"
            :size="35"
            shape="circle"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </span>
        <span>Super Admin</span>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <icon-font type="gear-personal" />
            <span> 个人中心 </span>
          </a-menu-item>
          <a-menu-item>
            <icon-font type="gear-setup" />
            <span> 个人设置 </span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item>
            <icon-font type="gear-logout" />
            <span> 退出登录 </span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "userInfo",
  isRouter: false,
  isComponents: true,
  setup() {
    const noticeNumber = 1;
    
    return {
      noticeNumber,
    };
  },
});
</script>