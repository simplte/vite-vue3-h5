<template>
  <div class="sdk_page">123</div>
</template>

<script setup lang="ts">
import { defineProps, nextTick, reactive, ref, watch, withDefaults } from 'vue';
const simplePerson = ref('张三');
const person = ref({ name: '张三' });
const complexPerson = ref({ name: '张三', info: { age: 18 } });
const reactivePerson = reactive({ name: '张三', info: { age: 18 } });
//改变属性，观察以下不同情景下的监听结果
nextTick(() => {
  simplePerson.value = '李四';
  person.value.name = '李四';
  complexPerson.value.info.age = 20;
  reactivePerson.info.age = 22;
});
watch(simplePerson, (val) => {
  console.log(val);
});
//情景二：数据源为'张三'
// watch(simplePerson.value, (newVal) => {
//     console.log(newVal) //非法数据源，监听不到且控制台告警
// })
//情景三：数据源为RefImpl，但是.value才是响应式对象，所以要加deep
watch(
  person,
  (val) => {
    console.log(val);
  },
  { deep: true }
);
//情景四：数据源为响应式对象
watch(person.value, (val) => {
  console.log(val);
});
//情景五：数据源为'张三'
// watch(person.value.name, (newVal) => {
//     console.log(newVal) //非法数据源，监听不到且控制台告警
// })
watch(complexPerson.value.info, (newVal, oldVal) => {
  console.log(newVal); //输出：Proxy {age: 20}
  console.log(newVal === oldVal); //输出：true
});
watch(
  () => complexPerson.value.info,
  (newVal) => {
    console.log(newVal); //除非设置deep: true或info属性被整体替换，否则监听不到
  }
);
//情景九：数据源为响应式对象
watch(reactivePerson, (newVal) => {
  console.log(newVal); //不设置deep: true也可以监听到
});

/**
 * deep会影响性能，而reactive会隐式的设置deep: true，
 * 所以只有明确状态数据结构比较简单且数据量不大时使用reactive，
 * 其他一律使用ref
 */

//  2.给props设置默认值
type Props = {
  placeholder?: string;
  modelValue: string;
  multiple?: boolean;
};
const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择',
  multiple: false,
});
console.log(props);
</script>
