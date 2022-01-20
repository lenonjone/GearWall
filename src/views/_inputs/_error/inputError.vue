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
    <a-input value="无效的输入框类型,请核实配置数据！！！" disabled  style="width: 70%;color: #ff7875;text-align:center" />
  </a-input-group>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: "inputError",
  isRouter: false,
  isComponents: true,
  props: {
    //接收子组件传值
    indata: Object,
  },
  setup(props) {
    
     const state=reactive({
      textName: props.indata.startText
    })

    return{
       ...toRefs(state),
    }
  },
})
</script>
