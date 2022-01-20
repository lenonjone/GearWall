<template>
  <a-input-group compact>
    <a-input
      v-model:value="textName"
      style="
        width: 30%;
        border-right: 0;
        color: #000000d9;
        pointer-events: none;
        background-color: #fff;
      "
      disabled
    />
    <a-date-picker
      v-model:value="returnKey"
      show-time
      :placeholder="placeholder"
      style="width: 70%"
    />
  </a-input-group>
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  getCurrentInstance,
} from "vue";

export default defineComponent({
  name: "inputDate",
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

    watch(
      () => state.returnKey,
      () => {
        state.returnValue = proxy
          .moment(state.returnKey)
          .format("YYYY-MM-DD HH:mm:ss");
        ctx.emit("todata", {
          key: props.indata.key,
          value: [state.returnValue],
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
