<template>
  <div class="sdk_page">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import InitCanvas from '@/assets/js/index.js';
const RequestModelInterface = {
  xToken: '8de470721618450d8cee6f7fee7076cf',
  appId: 'MAC001',
  storeCode: 'MC008',
  exInfo: {
    hasUpload: 'MC008',
    hasTempLate: 'MAC001',
  },
};
let selectMaterial = {};
function getSelectMaterial() {
  console.log(selectMaterial);
}
const CanvasInfo = {
  controlImg: {
    scale: 'http://localhost:8080/img/text.46fc4663.png',
    rotate: 'http://localhost:8080/img/material.19d4a338.png',
    del: 'http://localhost:8080/img/template.cc3d10b8.png',
  },
};
const canvasCase = new InitCanvas({
  initCanvasParams: RequestModelInterface,
  canvasBaseInfo: CanvasInfo,
  env: 'Test',
});

// 初始化商品
// canvasId: 'canvas',
let areaNumInfo = [];
canvasCase.initGoodsInfo('Lipstick').then((res) => {
  if (res.code == 0 && res.success) {
    areaNumInfo = res.data;
    drawCanvas({
      canvasId: 'canvas',
      muduleId: 'M20',
      areaNum: 'area01',
      onCallBack: {
        select: (e) => {
          selectMaterial = e;
          getSelectMaterial();
        },
      },
    });
  } else {
    console.log(res);
  }
});

let requestAPI = null;
// 渲染画布
async function drawCanvas(params) {
  const res = await canvasCase.drawCanvas(params);
  if (res.code == 0 && res.success) {
    console.log('渲染成功');
    requestAPI = canvasCase.commenApiRequest();
    requestAPI.getMaterialCategory({});
    console.log(requestAPI);
  } else {
    console.log(res);
  }
}
</script>
<style></style>
