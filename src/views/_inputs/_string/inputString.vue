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
    <a-input v-model:value="returnKey" :placeholder="placeholder" :suffix="textUnit" style="width: 70%" />
  </a-input-group>
</template>
<script>
import { defineComponent, reactive, toRefs, watch } from 'vue';

export default defineComponent({
  name: "inputString",
  isRouter: false,
  isComponents: true,
  props: {
    //接收子组件传值
    indata: Object,
  },
  setup(props, ctx) {

    const state=reactive({
      textName: props.indata.startText,
      placeholder: props.indata.placeholder,
      textUnit: props.indata.endText,
      returnKey:null,
      returnValue:null,
    })

    watch(
      () => [state.returnKey],
      () => {
        state.returnValue=state.returnKey;
        ctx.emit("todata", {"key":props.indata.key,"value":[state.returnValue],"field":props.indata.field,"searchType":props.indata.searchType});
      },
    );

    return{
      ...toRefs(state),
    }
  },
})
</script>