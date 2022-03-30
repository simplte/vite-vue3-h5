<template>
  <div>webSocket开启状态：</div>
  <van-switch v-model="getIsOpen" />
  <div @click="toggle">开启socket</div>
  <van-field v-model="msgVal" placeholder="请输入socket值" />
  <div @click="handlerSend">所有用户上线</div>
  <div @click="sendMsg('xh')">小红发送一条数据</div>
  <div @click="sendMsg('xl')">小绿发送一条数据</div>
  <div @click="sendMsg('dh')">小黄发送一条数据</div>
  <div>
    <p>消息列表:</p>
    <p v-for="(item, index) in getList" :key="index" class="msg-box">
      <span>{{ item.id }}</span>
      <span>{{ item.res }}</span>
    </p>
  </div>
</template>
<script setup lang="ts">
import { useWebSocket } from '@vueuse/core';
import { computed, reactive, ref, watchEffect } from 'vue';
const state = reactive({
  server: 'ws://localhost:4000/test',
  sendValue: '',
  recordList: [] as { id: number; time: number; res: string }[],
});
const { status, data, send, close, open } = useWebSocket(state.server, {
  // 自动重启连接
  autoReconnect: false,
  // 心跳
  heartbeat: {
    message: 'pingqc',
    interval: 5000,
  },
});
let msgVal = ref<string>('');
// 监听socket得返回值
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
const getIsOpen = computed(() => {
  console.log('getIsOpen:', status.value);
  return status.value == 'OPEN';
});
const getTagColor = computed(() => (getIsOpen.value ? 'success' : 'red'));
// socket返回得值
const getList = computed(() => {
  return [...state.recordList].reverse();
});
// 新增socket  用户上线功能
function handlerSend() {
  send(JSON.stringify({ id: 'xh', msg: 'xh' }));
  send(JSON.stringify({ id: 'xl', msg: 'xl' }));
  send(JSON.stringify({ id: 'dh', msg: 'dh' }));
}
function sendMsg(user) {
  send(JSON.stringify({ id: user, msg: msgVal.value }));
}
function toggle() {
  console.log(data.value);
  console.log(status.value);
  console.log(getIsOpen.value);
  if (getIsOpen.value) {
    close();
  } else {
    open();
  }
}
</script>

<style>
.msg-box {
  display: flex;
}
</style>
