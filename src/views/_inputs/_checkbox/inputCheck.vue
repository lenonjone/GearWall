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
    <a-dropdown
      :trigger="['click']"
      v-model:visible="visible"
      @visibleChange="saveValue"
    >
      <a-input
        v-model:value="returnKey.data"
        style="width: 70%"
        :placeholder="placeholder"
      />

      <template #overlay>
        <div
          style="background-color: #fff; width: 350px; padding: 8px 8px 5px 8px"
        >
          <div :style="{ borderBottom: '1px solid #E9E9E9' }">
            <a-checkbox
              v-model:checked="checkAll"
              :indeterminate="indeterminate"
              @change="onCheckAllChange"
            >
              全选
            </a-checkbox>
          </div>
          <br />
          <a-checkbox-group
            v-model:value="returnValue.data"
            name="checkboxgroup"
            :options="checkData.data"
          />
        </div>
      </template>
    </a-dropdown>
  </a-input-group>
</template>
<script>
import { defineComponent, reactive, ref, watch, toRefs } from "vue";

export default defineComponent({
  name: "inputCheck",
  isRouter: false,
  isComponents: true,
  props: {
    //接收子组件传值
    indata: Object,
  },
  setup(props, ctx) {
    const state = reactive({
      textName: props.indata.startText,
      placeholder: props.indata.placeholder,
      indeterminate: false,
      checkAll: false,
      checkList: [],
    });
    const returnValue = reactive({ data: [] });

    const returnKey = reactive({ data: [] });

    const visible = ref(false);

    const getSource = () => {
      let res;

      if (props.indata.optionSource.custom === "") {
        //测试默认值
        res = [
         
        ];
      } else {
        res = JSON.parse(props.indata.optionSource.custom);
      }

      return res;
    };

    const checkData = reactive({
      data: getSource(),
    });
    const saveValue = () => {
      // console.log(returnValue.data);
    };

    const onCheckAllChange = (e) => {
      Object.assign(state, {
        checkList: e.target.checked ? checkData.data : [],
        indeterminate: false,
      });
      let tmpList = [];
      state.checkList.forEach((i) => {
        tmpList.push(i.value);
      });
      returnValue.data = tmpList;
    };

    watch(
      () => returnValue.data,
      (val) => {
        state.indeterminate =
          !!val.length && val.length < checkData.data.length;
        state.checkAll = val.length === checkData.data.length;
        saveKey();
        ctx.emit("todata", {
          key: props.indata.key,
          value: [returnValue.data],
          field: props.indata.field,
          searchType: props.indata.searchType,
        });
      }
    );

    const saveKey = () => {
      returnKey.data = [];
      for (var n = 0; n < returnValue.data.length; n++) {
        for (var m = 0; m < checkData.data.length; m++) {
          if (
            checkData.data[m].value === returnValue.data[n] &&
            returnKey.data.findIndex((j) => j === checkData.data[m].label) ===
              -1
          ) {
            returnKey.data.push(checkData.data[m].label);
          }
        }
      }
    };
    return {
      ...toRefs(state),
      visible,
      returnValue,
      returnKey,
      checkData,
      saveValue,
      saveKey,
      onCheckAllChange,
      getSource,
    };
  },
});
</script>
