<template>
  <div class="container" @scroll="onScroll">
    <div ref="panel" class="panel" :style="{ paddingTop: paddingTop + 'px' }">
      <div v-for="item in visibleList" :key="item" class="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
let panel = ref(null); //列表容器DOM

//构造的长列表原始数据
let raw = Array(100000)
  .fill(0)
  .map((v, i) => `item-${i}`);
let count = 10; //实际渲染DOM的列表数量
let start = ref(0); //从长列表数组总截取数据的起点
let end = ref(10); //从长列表数组总截取数据的终点
let itemHeight = 30; //单个列表项的高度
let paddingTop = ref(0); //列表容器的上内边距
let totalHeight = raw.length * itemHeight; //原始数据理论上完全渲染后占据的总高度

let visibleList = computed(() => raw.slice(start.value, end.value)); //根据起点和终点获取要渲染的数据
onMounted(() => {
  panel.value.style.height = totalHeight + 'px';
  console.log(panel.value.scrollTop);
}); //在mounted后设置列表容器的高度

//滚动-->根据滚动距离计算起点和终点的下标-->计算属性得到visibleList-->真实DOM被替换 同时设置paddingTop让元素视觉上没跳动
const onScroll = function (e) {
  console.log(e);
  start.value = Math.floor(e.target.scrollTop / itemHeight); //当滚动后，重新计算起点的位置
  end.value = start.value + count; //设置终点的位置
  paddingTop.value = start.value * itemHeight;
};
</script>
<style>
* {
  box-sizing: border-box;
  margin: 0;
}

.container {
  height: 100vh;
  overflow-y: auto;
}

.panel {
  border: 1px solid red;
}

.item {
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
  cursor: pointer;
  border: 1px solid #eee;
}
</style>
