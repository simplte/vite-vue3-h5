<script setup lang="ts">
import { ref } from '@vue/reactivity';

const props = defineProps<{
  msg: String;
}>();
console.log(props);
const emits = defineEmits(['clickFun']);
const tapEmitFun = () => {
  emits('clickFun', '我是hello组件');
};
const hwData = ref<string>('来自hellow中的数据：qccc');
const exposeHwFn = () => {
  return hwData.value;
};
defineExpose({ exposeHwFn });
</script>

<template>
  <div class="greetings" @click="tapEmitFun">{{ msg }}</div>
  <div class="greetings">{{ hwData }}</div>
</template>
