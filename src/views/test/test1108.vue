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
        v-for="item in device.data.data"
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
import axios from "../../http";
export default defineComponent({
  name: "inputSelect1108",
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
    });

    const scrollPage = reactive({ data: 1 });
    const deviceData = reactive({ data: [] }); //存放后台返回的数据
    const keyword = reactive({ data: "" });
    const device = reactive({ data: [] }); //存放下拉框的数据

    /**
     * 下拉框 分页 搜索
     * @param name
     * @param code
     */

    const changeDeviceCode = () => {
      axios({
        method: "get",
        url:
          "/api/gear-dapper-test/sys-dic/90010" +
          "/" +
          scrollPage.data +
          "/" +
          10 +
          "/" +
          keyword.data,
        // params: {

        // },
      }).then((res) => {
        if (res.status != 200) {
          console.log(res.status);
        } else {
          device.data = res.data.data;
          deviceData.data = res.data.data;
        }
      });
    };
    changeDeviceCode();

    //选择设备编码下拉框滚动事件
    const handlePopupScroll = (e) => {
      const { target } = e;
      const scrollHeight = target.scrollHeight - target.scrollTop;
      const clientHeight = target.clientHeight;
      // 下拉框不下拉的时候
      if (scrollHeight === 0 && clientHeight === 0) {
        scrollPage.data = 1;
      } else {
        // 当下拉框滚动条到达底部的时候
        if (scrollHeight < clientHeight + 5) {
          pageData(1);
        } else if (scrollHeight == 3208) {
          pageData(2);
        }
      }
    };
    const pageData = (type) => {
      const treePageSize = 10 * (scrollPage || 1)// 新增数据量
      if (deviceData.data.total < scrollPage.data) {
        scrollPage.data = deviceData.data.total;
      } else {
        type == 1 ? scrollPage.data++ : scrollPage.data--;
        changeDeviceCode();
        let newData = [];
        let max = "";
        ;
        if (deviceData.data.data.length > treePageSize) {
          // 如果总数据的条数大于需要展示的数据
          max = treePageSize;
        } else {
          // 否则
          max = deviceData.data.data.length;
        }
        device.data.data.forEach((item, index) => {
          if (index < max) {
            //当data数组的下标小于max时
            newData.push(item);
          }
        });
        debugger;
        device.data.data = newData;
      }
    };
    const handleSearch = (key) => {
      keyword.data = key;
      changeDeviceCode();
    };

    return {
      scrollPage,
      deviceData,
      keyword,
      device,

      changeDeviceCode,
      handlePopupScroll,
      pageData,
      handleSearch,
      changeDeviceCode,
      ...toRefs(state),
    };
  },
});
</script>
<style>
</style>
