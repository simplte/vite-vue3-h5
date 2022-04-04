<template>
  <div class="sdk_page">
    <canvas ref="canvasScale"></canvas>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
let canvas = ref<HTMLElement>();
let canvasScale = ref<HTMLElement>();
let ctx = null;
let ctxScale = null;

const dpr = window.devicePixelRatio;
const widthV = 500;
const heightV = 500;

onMounted(() => {
  ctx = canvas.value?.getContext('2d');
  ctxScale = canvasScale.value?.getContext('2d');
  adaptDPR();
  noScaleDPR();
});
const adaptDPR = () => {
  canvasScale.value.width = Math.round(widthV * dpr);
  canvasScale.value.height = Math.round(heightV * dpr);
  canvasScale.value.style.width = widthV + 'px';
  canvasScale.value.style.height = heightV + 'px';

  ctxScale.scale(dpr, dpr);
  ctxScale.fillStyle = 'red';
  ctxScale.fillRect(10, 10, 250, 250);

  console.log(ctxScale);
};
const noScaleDPR = () => {
  canvas.value.width = Math.round(widthV * dpr);
  canvas.value.height = Math.round(heightV * dpr);
  canvas.value.style.width = widthV + 'px';
  canvas.value.style.height = heightV + 'px';
  ctx.fillStyle = 'red';
  ctx.fillRect(10, 10, 250, 250);
  console.log(ctx);
};
</script>
