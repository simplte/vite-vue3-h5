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
      <span class="user-name">{{ item.id }} 说</span>
      <span class="user-msg">{{ item.res }}</span>
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
const adminLogin = () => {
  send(JSON.stringify({ id: 'admin', userName: '管理员', isLogged: true }));
};
adminLogin();
let msgVal = ref<string>('');
// 监听socket得返回值
watchEffect(() => {
  if (data.value) {
    try {
      console.log(data.value);
      const res = JSON.parse(data.value);
      if (res.id == 'admin') {
        console.log(res.res);
        return;
      }
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
  send(JSON.stringify({ id: 'xh', msg: 'xh', userName: '小红', isLogged: true }));
  send(JSON.stringify({ id: 'xl', msg: 'xl', userName: '小绿', isLogged: true }));
  send(JSON.stringify({ id: 'dh', msg: 'dh', userName: '大黄', isLogged: true }));
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

<style lang="scss">
.msg-box {
  display: flex;
  margin-bottom: 8px;

  .user-name {
    width: 100px;
    margin-right: 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 20px;
  }

  .user-msg {
    padding: 0 18px;
    background-color: greenyellow;
    border: 1px solid #ccc;
    border-radius: 20px;
  }
}
</style>
