<template>
  <div v-show="isShowMove" :class="move ? 'container moveingLeft' : 'container moveingRight'">
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
  </div>
  <div class="container">
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
  </div>
  <van-button type="default" @click="moveFun">默认按钮</van-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let move = ref<boolean>(false);
let isShowMove = ref<boolean>(true);
const moveFun = () => {
  if (!isShowMove.value) {
    isShowMove.value = !isShowMove.value;
    move.value = !move.value;

    return;
  }
  move.value = !move.value;

  setTimeout(() => {
    isShowMove.value = !isShowMove.value;
  }, 3000);
};
</script>
<style lang="less">
.container {
  position: relative;
  overflow: hidden;
  background-color: red;
  transition: all 3s;

  &.moveingLeft {
    background: transparent;
    transform: translateX(-100%);
  }

  &.moveingRight {
    left: 0;
    background-color: red;
  }
}
</style>
