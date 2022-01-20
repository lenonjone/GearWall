<template>
  <a-row type="flex" justify="center">
    <a-col :span="8" :order="1">
      <div class="textInfo" style="text-align:center;">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href=""
          style="color:#fff;font-weight: 600;font-size:14px;"
        >
         GearNext 开发文档
        </a>
      </div>
    </a-col>
    <a-col :span="8" :order="2">
      <div class="recordInfo" style="text-align:center;">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://beian.miit.gov.cn/"
          style="color:#fff;font-weight: 600;font-size:14px"
        >
         备案号：蜀ICP备2021018595号-1
        </a>
      </div>
    </a-col>
    <a-col :span="8" :order="3">
      <div class="friendLink" style="text-align:center;">
        <a-tag color="#55acee">
          <template #icon>
            <twitter-outlined />
          </template>
          Gear
        </a-tag>
        <a-tag color="#cd201f">
          <template #icon>
            <youtube-outlined />
          </template>
          Gear
        </a-tag>
        <a-tag color="#3b5999">
          <template #icon>
            <facebook-outlined />
          </template>
          Gear
        </a-tag>
        <a-tag color="#55acee">
          <template #icon>
            <linkedin-outlined />
          </template>
          Gear
        </a-tag>
      </div>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  TwitterOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  name: 'footerInfo',
  isRouter: false,
  isComponents: true,
  components: {
    TwitterOutlined,
    YoutubeOutlined,
    FacebookOutlined,
    LinkedinOutlined,
  },
});
</script>

