<template>
  <a-input-group compact>
    <a-input
      v-model:value="textName"
      style="
        width: 30%;
        color: #000000d9;
        pointer-events: none;
        background-color: #fff;
      "
      disabled
    />
    <a-select
      :filter-option="false"
      show-search
      :allowClear="true"
      style="width: 70%"
      :placeholder="placeholder"
      @popupScroll="handlePopupScroll"
      @search="handleSearch"
    >
      <a-select-option
        v-for="item in frontDataZ.data"
        v-bind:key="item.label"
        :value="item.value"
      >
        {{ item.label }}
      </a-select-option>
    </a-select>
  </a-input-group>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from "vue";
import axios from "../../../http";
export default defineComponent({
  name: "inputSelect",
  isRouter: false,
  isComponents: true,
  props: {
    //接收子组件传值
    indata: Object,
  },
  setup(props, ctx) {
    const { proxy } = getCurrentInstance();

    const state = reactive({
      textName: props.indata.startText,
      placeholder: props.indata.placeholder,
      returnKey: null,
      returnValue: null,

      dataZ: [], //总数据（不会改变）
      frontDataZ: [], //存放前100的数据
      sourceOwnerSystems: [],
      valueData: "",
      treePageSize: 10,
      scrollPage: 1,
      keyword: "",
    });

    //通过接口获取数据
    const showTabelCiList = () => {
      axios({
        method: "get",
        url:
          "/api/gear-dapper-test/sys-dic/90010" +
          "/" +
          state.scrollPage +
          "/" +
          10 +
          "/" +
          state.keyword,
        // params: {

        // },
      }).then((res) => {
        if (res.status != 200) {
          console.log(res.status);
        } else if(res.data.data) {
          state.dataZ = res.data.data;
          state.frontDataZ = res.data.data;
        }
      });
    };
    showTabelCiList();

    const handleSearch = (key) => {
      state.keyword = key;
      showTabelCiList();
    };

    return {
      ...toRefs(state),

      showTabelCiList,
      handleSearch,
    };
  },
});
</script>
<style>
</style>
