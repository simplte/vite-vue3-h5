<template>
  <div>webSocket开启状态：{{ getIsOpen ? '开启' : '关闭' }}</div>
  <div @click="toggle">开启socket</div>
</template>
<script setup lang="ts">
import { useWebSocket } from '@vueuse/core';
import { computed, reactive, watchEffect } from 'vue';
const state = reactive({
  server: 'ws://localhost:3300/test',
  sendValue: '',
  recordList: [] as { id: number; time: number; res: string }[],
});
const { status, data, send, close, open } = useWebSocket(state.server, {
  autoReconnect: false,
  heartbeat: true,
});
console.log(status, data, send, close, open);
watchEffect(() => {
  if (data.value) {
    try {
      console.log(data.value);
      const res = JSON.parse(data.value);
      state.recordList.push(res);
    } catch (error) {
      state.recordList.push({
        res: data.value,
        id: Math.ceil(Math.random() * 1000),
        time: new Date().getTime(),
      });
    }
  }
});
const getIsOpen = computed(() => status.value == 'OPEN');
// const getTagColor = computed(() => (getIsOpen.value ? 'success' : 'red'));
// const getList = computed(() => {
//   return [...state.recordList].reverse();
// });
// function handlerSend() {
//   send(state.sendValue);
//   state.sendValue = '';
// }
function toggle() {
  console.log(getIsOpen.value);
  if (getIsOpen.value) {
    close();
  } else {
    open();
  }
}
</script>
