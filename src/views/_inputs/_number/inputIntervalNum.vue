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
    <a-input-number
      v-model:value="returnKey1"
      :min="0"
      :max="10"
      style="width: 30%; text-align: center"
      :placeholder="placeholder[0]"
    />
    <a-input
      style="
        width: 10%;
        border-left: 0;
        pointer-events: none;
        text-align: center;
        background-color: #fff;
      "
      placeholder="~"
      disabled
    />
    <a-input-number
      v-model:value="returnKey2"
      :min="0"
      :max="10"
      style="width: 30%; text-align: center; border-left: 0"
      :placeholder="placeholder[1]"
    />
  </a-input-group>
</template>
<script>
import { defineComponent, reactive, toRefs, watch } from "vue";

export default defineComponent({
  name: "inputIntervalNum",
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
      returnKey1: null,
      returnKey2: null,
      returnValue: [],
    });

    watch(
      () => [state.returnKey1, state.returnKey2],
      () => {
        state.returnValue = [];
        state.returnValue.push(state.returnKey1);
        state.returnValue.push(state.returnKey2);
        ctx.emit("todata", {
          key: props.indata.key,
          value: state.returnValue,
          field: props.indata.field,
          searchType: props.indata.searchType,
        });
      }
    );

    return {
      ...toRefs(state),
    };
  },
});
</script>