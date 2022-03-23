<template>
  <div class="m-container">
    <div class="m-header">
      <SvgIcon name="moon" class="svg-icon"></SvgIcon>
    </div>
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
              <div v-if="scope.item.no === 1">
                代码中是有2000条的数据的，但是我们在渲染的时候刚好满足可视窗口高度的列表，因为代码中为了显示特别一点，还特意加了一个独特的高度的，所以在滚动的时候无法精确到每次都有一定的条数。`item-height-getter`可以通过这个来添加个别`Item`特别的高度。`default-item-height`这个可以设置item默认的高度，在没有设置`item-height-getter`情况下，就可以固定每次显示多少条，因为高度都是一样的，可视窗口就那么宽。有兴趣的朋友可以自己去试一下，这里就不做展示了。
              </div>
              <div v-else :style="{ color: scope.item.color }" class="detail-content">
                <img v-lazy="scope.item.img" alt="" />

                <div class="intros">
                  NO: {{ scope.item.no }}, height: {{ scope.height }}px, offset:
                  {{ scope.offset }}px
                </div>
              </div>
            </div>
          </template>
        </Scroll>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Scroll from '@/components/Scroll.vue';
import SvgIcon from '@/components/SvgIcon.vue';
type ListInfo = {
  no: number;
  color: string;
  img: string;
};

const list = ref<any[]>([]);
const page = ref<number>(0);
const itemHeightGetter = (item) => {
  // if (item.no % 33 === 0) {
  //   return 27;
  // }
  // return 20 + (item.no % 10);
  return 50;
};
const defaultItemHeight = ref<number>(30);
const defaultImgUrl = [
  'https://mmdz.meimei.life/mac2.png',
  'https://mmdz.meimei.life/mac3.png',
  'https://mmdz.meimei.life/mac5.png',
  'https://mmdz.meimei.life/mac6.png',
  'https://mmdz.meimei.life/mac7.png',
  'https://mmdz.meimei.life/mac8.png',
  'https://mmdz.meimei.life/mac9.png',
  'https://mmdz.meimei.life/mac10.png',
];
let _getting = false;
const listScroll = (data) => {
  if (!_getting && data.bottomItemIndex >= list.value.length - 3) {
    console.log(data.bottomItemIndex, list.value.length);
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
      const baseIndex = page.value * 200;
      resolve(
        new Array(200).fill(0).map((i, index) => {
          return {
            no: baseIndex + index,
            color: ['#33d', '#3d3', '#d33', '#333'][(Math.random() * 4) | 0],
            img: defaultImgUrl[(Math.random() * 8) | 0],
          };
        })
      );
    }, 100);
  });
};
getData().then((d) => {
  console.log(d);
  list.value = d;
});
</script>
<style lang="less">
.m-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .m-header {
    height: 40px;
    background: greenyellow;
  }

  .m-list {
    position: relative;
    flex: 1;

    .m-list-container {
      position: absolute;
      width: 100%;
      height: 100%;

      .item {
        display: flex;
        align-items: center;
        height: 100%;
      }
    }
  }
}

.detail-content {
  display: flex;
  align-items: center;

  .intros {
    flex: 1;
    text-align: center;
  }

  img {
    width: 50px;
    height: 50px;
  }
}

.svg-icon {
  width: 30px;
  height: 30px;
}
</style>
