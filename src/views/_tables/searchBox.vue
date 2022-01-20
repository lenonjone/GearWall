<template>
  <div :style="{ background: '#ececec', padding: '10px 5px 0 5px' }">
    <a-row type="flex" justify="start">
      <a-col
        v-for="item in searchBoxData.data"
        :key="item.key"
        :span="6"
        :order="item.order"
      >
        <template v-if="item.inputType === 'string'">
          <input-string :indata="item" />
        </template>
        <template v-else-if="item.inputType === 'number'">
          <input-number :indata="item" />
        </template>
        <template v-else-if="item.inputType === 'date'">
          <input-date :indata="item" @todata="todataCheck" />
        </template>
        <template v-else-if="item.inputType === 'interval-num'">
          <input-interval-num :indata="item" @todata="todataCheck" />
        </template>
        <template v-else-if="item.inputType === 'interval-date'">
          <input-interval-date :indata="item" @todata="todataCheck" />
        </template>
        <template v-else-if="item.inputType === 'select'">
          <input-select :indata="item" />
        </template>
        <template v-else-if="item.inputType === 'checkbox'">
          <input-check :indata="item" @todata="todataCheck" />
        </template>
        <template v-else>
          <input-error :indata="item" />
        </template>
      </a-col>
    </a-row>
    <div
      style="
        height: 40px;
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: right;
      "
    >
      <a-space size="small">
        <a-button type="primary" ghost @click="search">查询</a-button>
        <a-button danger ghost>重置</a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";

const searchDic = reactive({
  data: [],
});

const searchBoxData = reactive({
  data: [
    // {
    //   key:"1", // key
    //   startText: "名称", // 输入框前显示
    //   endText: "", // 输入框后显示
    //   field: "goodsname", // 要查询的数据库字段名
    //   value: ["苹果"], // 要查询的数据库字段值（数组类型，支持in操作以及between操作）
    //   checkValue:[], // 组件可选数据池
    //   isShow: false, // 是否显示
    //   searchType: "equal", // 查询方式：equal、like、in、between
    //   inputType: "string", // 输入框类型：文字(string)、数字(number)、日期(date)、数字区间(interval-num)、日期区间(interval-date)、下拉框(select)、多选框(checkbox)
    //   placeholder: "请输入查询商品的名称", // 默认显示值
    //   order:"1" 排序
    // },


    // {
    //   key: "1",
    //   startText: "文章名称",
    //   endText: "™",
    //   field: "goodsname",
    //   value: ["苹果"],
    //   isShow: false,
    //   searchType: "equal",
    //   inputType: "string",
    //   placeholder: "请输入查询文章名称",
    //   order: "7",
    // },


    {
      key: "1",
      startText: "商品名称",
      endText: "™",
      field: "goodsname",
      value: ["苹果"],
      isShow: false,
      searchType: "equal",
      inputType: "string",
      placeholder: "请输入查询商品的名称",
      order: "7",
    },
    {
      key: "2",
      startText: "售出数量",
      endText: "个",
      field: "goodsname",
      value: ["苹果"],
      checkValue: [],
      isShow: false,
      searchType: "equal",
      inputType: "number",
      placeholder: "请输入售出数量",
      order: "6",
    },
    {
      key: "3",
      startText: "售卖时间",
      endText: "",
      field: "goodsname",
      value: ["苹果"],
      checkValue: [],
      isShow: false,
      searchType: "equal",
      inputType: "date",
      placeholder: "请输入售卖时间",
      order: "5",
    },
    {
      key: "4",
      startText: "商品单价",
      endText: "",
      field: "goodsname",
      value: ["苹果"],
      checkValue: [],
      isShow: false,
      searchType: "equal",
      inputType: "interval-num",
      placeholder: ["最低价", "最高价"],
      order: "3",
    },
    {
      key: "5",
      startText: "促销日期",
      endText: "",
      field: "goodsname",
      value: ["苹果"],
      checkValue: [],
      isShow: false,
      searchType: "equal",
      inputType: "interval-date",
      placeholder: ["起始时间", "结束时间"],
      order: "4",
    },
    {
      key: "6",
      startText: "销售区域",
      endText: "",
      field: "goodsname",
      value: ["苹果"],
      checkValue: [],
      isShow: false,
      searchType: "equal",
      inputType: "select",
      placeholder: "请选择查询商品的销售区域",
      order: "2",
    },
    {
      key: "7",
      startText: "种类",
      endText: "",
      field: "goodsname",
      value: ["苹果"],
      checkValue: [],
      isShow: false,
      searchType: "equal",
      inputType: "checkbox",
      placeholder: "请选择查询商品的种类",
      optionSource: {
        dicID: "",
        custom:
          '[{"label":"苹果","value":"1"},{"label":"香蕉","value":"2"},{"label":"梨","value":"3"},{"label":"栗子","value":"4"},{"label":"西瓜","value":"5"},{"label":"芒果","value":"6"},{"label":"火龙果","value":"7"},{"label":"榴莲","value":"8"},{"label":"凤梨","value":"9"},{"label":"苹果1","value":"10"},{"label":"香蕉1","value":"11"},{"label":"梨1","value":"12"},{"label":"栗子1","value":"13"},{"label":"西瓜1","value":"14"},{"label":"芒果1","value":"15"},{"label":"火龙果1","value":"16"},{"label":"榴莲1","value":"17"},{"label":"凤梨1","value":"18"}]',
      },
      order: "1",
    },
    {
      key: "8",
      startText: "名称",
      endText: "",
      field: "goodsname",
      value: ["苹果"],
      checkValue: [],
      isShow: false,
      searchType: "equal",
      inputType: "",
      placeholder: "请输入查询商品的名称",
      order: "8",
    },
  ],
});

const search = () => {
  console.log("search");
};

export default defineComponent({
  name: "searchBox",
  isRouter: false,
  isComponents: true,
  components: {},

  setup() {
    const state = reactive({});

    const todataCheck = (data) => {
      var index = searchDic.data.findIndex((item) => item.key == data.key);
      if (index === -1) {
        searchDic.data.push(data);
      } else {
        searchDic.data[index] = data;
      }
      console.log(searchDic);
    };

    return {
      ...toRefs(state),
      searchBoxData,
      search,
      todataCheck,
      searchDic,
    };
  },
});
</script>
<style>
.ant-input-number-input {
  text-align: center;
}
</style>
