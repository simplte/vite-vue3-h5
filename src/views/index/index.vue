<template>
  <!-- <van-skeleton title :row="13" :loading="loading">
    <van-swipe class="my-swipe">
      <van-swipe-item>
        <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-notice-bar
      left-icon="volume-o"
      text="无论我们能活多久，我们能够享受的只有无法分割的此刻，此外别无其他。"
    />
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
  </van-skeleton> -->
  <div class="m-container">
    <div class="m-header">我是头部</div>
    <div class="m-list">
      <div class="m-list-container">
        <Scroll
          ref="list-view"
          :list="list"
          :item-height-getter="itemHeightGetter"
          :default-item-height="defaultItemHeight"
          @scroll="listScroll"
        >
          <template #default="scope">
            <div class="item">
              {{ scope }}
              <!-- <div v-if="scope.item.no === 1">
                代码中是有2000条的数据的，但是我们在渲染的时候刚好满足可视窗口高度的列表，因为代码中为了显示特别一点，还特意加了一个独特的高度的，所以在滚动的时候无法精确到每次都有一定的条数。`item-height-getter`可以通过这个来添加个别`Item`特别的高度。`default-item-height`这个可以设置item默认的高度，在没有设置`item-height-getter`情况下，就可以固定每次显示多少条，因为高度都是一样的，可视窗口就那么宽。有兴趣的朋友可以自己去试一下，这里就不做展示了。
              </div>
              <div v-else :style="{ color: scope.item.color }">
                NO: {{ scope.item.no }}, height: {{ scope.height }}px, offset: {{ scope.offset }}px
              </div> -->
            </div>
          </template>
        </Scroll>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';

import Scroll from '@/components/Scroll.vue';
import { LinbuduLiteralType } from '@/utils/Learnts';
type ListInfo = {
  no: number;
  color: string;
};
const Case = new LinbuduLiteralType();
console.log(Case.value.endsWith('u'));

let loading = ref<boolean>(true);
let active = ref<number>(0);
onMounted(() => {
  loading.value = false;
  getData().then((d) => {
    list.value = d;
  });
});
watchEffect(() => {
  console.log(active.value);
});
const list = ref<any[]>([]);
const page = ref<number>(0);
const itemHeightGetter = (item) => {
  if (item.no % 33 === 0) {
    return 27;
  }
  return 20 + (item.no % 10);
};
const defaultItemHeight = 30;
let _getting = false;
const listScroll = (data) => {
  if (!_getting && data.bottomItemIndex >= list.value.length - 3) {
    _getting = true;
    getData().then((d) => {
      list.value.push(...d);
      page.value++;
      _getting = false;
    });
  }
};
const getData = (): Promise<ListInfo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const baseIndex = page.value * 20;
      resolve(
        new Array(2000).fill(0).map((i, index) => {
          return {
            no: baseIndex + index,
            color: ['#33d', '#3d3', '#d33', '#333'][(Math.random() * 4) | 0],
          };
        })
      );
    }, 100);
  });
};
</script>
<style lang="less">
.my-swipe .van-swipe-item {
  font-size: 20px;
  line-height: 150px;
  color: #fff;
  text-align: center;
  background-color: #39a9ed;
}
</style>
