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
interface Person {
  name: string;
  age: string;
  gender: number;
}

interface PersonVal {
  name: string;
}
const personVal: Person = {
  name: '123',
  age: '123',
  gender: 0,
};
type name = string;
type isName = PersonVal extends Person ? 'string' : 'boolean';

// 获取personVal的类型，并读取personVal类型的key
type PersonNew = keyof typeof personVal;
const valName: isName = 'boolean';

type ReadOnlyType<T> = {
  readonly [p in keyof T]: T[p];
};
type ReadOnlyPerson = ReadOnlyType<Person>;
</script>

<template>
  <div class="greetings" @click="tapEmitFun">{{ msg }}</div>
  <div class="greetings">{{ hwData }}</div>
</template>
