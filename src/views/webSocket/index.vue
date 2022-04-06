<template>
  <div>webSocket开启状态：</div>
  <van-switch v-model="getIsOpen" />
  <div @click="toggle">开启socket</div>
  <van-field v-model="msgVal" placeholder="请输入消息" />
  <div @click="handlerSend">所有用户上线</div>
  <div @click="sendMsg('xh', '小红')">小红发送一条数据</div>
  <div @click="sendMsg('xl', '小绿')">小绿发送一条数据</div>
  <div @click="sendMsg('dh', '小黄')">小黄发送一条数据</div>
  <div>
    <p>消息列表:</p>
    <p v-for="(item, index) in getList" :key="index" class="msg-box">
      <span class="user-name">{{ item.userName }} 说</span>
      <span class="user-msg">{{ item.res }}</span>
    </p>
  </div>
  <div id="container"></div>
</template>
<script setup lang="ts">
import { useWebSocket } from '@vueuse/core';
import { Dialog } from 'vant';
import { computed, onMounted, reactive, ref, watchEffect } from 'vue';
const state = reactive({
  server: 'ws://localhost:4000/test',
  sendValue: '',
  recordList: [] as { id: number; time: number; res: string; userName: string }[],
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
        Dialog({ message: res.res });
        return;
      }
      state.recordList.push(res);
      msgVal.value = '';
    } catch (error) {
      state.recordList.push({
        res: data.value,
        id: Math.ceil(Math.random() * 1000),
        time: new Date().getTime(),
        userName: '',
      });
    }
  }
});
const getIsOpen = computed(() => {
  console.log('getIsOpen:', status.value);
  return status.value == 'OPEN';
});
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
function sendMsg(user, userName) {
  if (!msgVal.value) {
    Dialog.alert({ message: '不能发送空消息' });
    return;
  }
  send(JSON.stringify({ id: user, userName, msg: msgVal.value }));
}
function toggle() {
  if (getIsOpen.value) {
    close();
  } else {
    open();
  }
}
onMounted(() => {
  var center = new TMap.LatLng(39.984104, 116.307503);
  // 初始化地图
  var map = new TMap.Map('container', {
    zoom: 14,
    center: center,
  });

  var path = [
    new TMap.LatLng(39.98481500648338, 116.30571126937866),
    new TMap.LatLng(39.982266575222155, 116.30596876144409),
    new TMap.LatLng(39.982348784165886, 116.3111400604248),
    new TMap.LatLng(39.978813710266024, 116.3111400604248),
    new TMap.LatLng(39.978813710266024, 116.31699800491333),
  ];

  var polylineLayer = new TMap.MultiPolyline({
    map, // 绘制到目标地图
    // 折线样式定义
    styles: {
      style_blue: new TMap.PolylineStyle({
        color: '#3777FF', // 线填充色
        width: 4, // 折线宽度
        borderWidth: 2, // 边线宽度
        borderColor: '#FFF', // 边线颜色
        lineCap: 'round', // 线端头方式
        eraseColor: 'rgba(190,188,188,1)',
      }),
    },
    geometries: [
      {
        id: 'erasePath',
        styleId: 'style_blue',
        paths: path,
      },
    ],
  });

  var marker = new TMap.MultiMarker({
    map,
    styles: {
      'car-down': new TMap.MarkerStyle({
        width: 40,
        height: 40,
        anchor: {
          x: 20,
          y: 20,
        },
        faceTo: 'map',
        rotate: 180,
        src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/car.png',
      }),
      start: new TMap.MarkerStyle({
        width: 25,
        height: 35,
        anchor: { x: 16, y: 32 },
        src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png',
      }),
      end: new TMap.MarkerStyle({
        width: 25,
        height: 35,
        anchor: { x: 16, y: 32 },
        src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png',
      }),
    },
    geometries: [
      {
        id: 'car',
        styleId: 'car-down',
        position: new TMap.LatLng(39.98481500648338, 116.30571126937866),
      },
      {
        id: 'start',
        styleId: 'start',
        position: new TMap.LatLng(39.98481500648338, 116.30571126937866),
      },
      {
        id: 'end',
        styleId: 'end',
        position: new TMap.LatLng(39.978813710266024, 116.31699800491333),
      },
    ],
  });
  // 使用marker 移动接口， https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocMarker
  marker.moveAlong(
    {
      car: {
        path,
        speed: 250,
      },
    },
    {
      autoRotation: true,
    }
  );
  marker.on('moving', (e) => {
    var passedLatLngs = e.car && e.car.passedLatLngs;
    if (passedLatLngs) {
      // 使用路线擦除接口 eraseTo, https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocVector
      polylineLayer.eraseTo(
        'erasePath',
        passedLatLngs.length - 1,
        passedLatLngs[passedLatLngs.length - 1]
      );
    }
  });
});
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
