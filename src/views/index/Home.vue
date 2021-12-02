<template>
  <div class="home">
    <div class="swiper-container swiper1">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="@/assets/logo.svg" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="@/assets/logo.svg" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="@/assets/logo.svg" alt="" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <div class="swiper-button-prev"></div>
      <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
      <div class="swiper-button-next"></div>
      <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
    </div>
  </div>
  <div class="moiveList">
    <div
      v-for="(item, index) in readBuyList"
      :key="index"
      class="moiveTab"
      :class="index == 0 ? 'firstTba' : ''"
    >
      <img :src="item.cover" class="coverImg" />
      <div class="introsBox">
        <p class="moiveDate">{{ item.create_time }}</p>
        <p class="moiveIntros">{{ item.title }}</p>
        <p class="bannelBox">
          <span class="bannel">
            <span class="contrlbox">
              <img class="look" src="@@/look2.png" />
              <span class="count">{{ item.video_wnum }}</span>
            </span>
            <span class="contrlbox">
              <img class="zan" src="@@/like.png" />
              <span class="count">{{ Number(item.video_lnum) }}</span>
            </span>
          </span>
        </p>
      </div>
    </div>
  </div>
  <HelloWorld ref="hwEL" msg="123123" @clickFun="onHw"></HelloWorld>
  <div @click="tapHwExposeFn">触发helloword中外抛的方法</div>
  <Welcome></Welcome>
  <div>value:{{ collapsed }}</div>
  <div @click="changeVuexVal">改变样式</div>
  <p>--------------</p>
  <div>{{ name }}</div>
  <div @click="changeToRefsVal()">改变toRefs的值</div>
  <p>--------------</p>
  <div v-for="item in testRawArr" :key="item">{{ item }}</div>
</template>
<script setup lang="ts">
// swiper-bundle.min.css 决定了小圆点和左右翻页标签，如果不需要可以不引用
import 'swiper/swiper-bundle.min.css';
// swiper.less/sass/css 决定了基础的样式
import 'swiper/swiper.scss';

import Swiper, { Autoplay, EffectCoverflow, EffectCube, Navigation, Pagination } from 'swiper';
import { computed, ref, toRaw, toRef } from 'vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

import { getUserInfo } from '@/api/mock/index';
import { getList } from '@/api/watch/index';
import HelloWorld from '@/components/HelloWorld.vue';
import Welcome from '@/components/Welcome.vue';
import { AppActionTypes } from '@/store/modules/app/action-types';

import { VideoInfo } from './types/index';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

let allReadCount = ref<number>(0);
let readBuyList = ref<VideoInfo[]>([]);
let currentPage = ref<number>(1);

// 1:读取vite define中定义的全局变量
// // console.log(process.env.APP_IS_LOCAL);
// // console.log(qcccc);

// vuex使用
const store = useStore();
const collapsed = computed(() => {
  return store.state.app.pageLoading;
});
// console.log(collapsed);
const changeVuexVal = () => {
  store.commit(`app/${AppActionTypes.SET_PAGE_LOADING}`, !collapsed.value);
};

onMounted(() => {
  new Swiper('.swiper1', {
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      hideOnClick: true,
    },
    autoplay: {
      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    on: {
      navigationShow: function () {
        // console.log('按钮显示了');
      },
    },
  });

  getInfo();
  getUserInfos();
});

const getInfo = async () => {
  const res = await getList({ page: currentPage.value });
  if (res && res.result == '0' && res.list.length > 0) {
    // 总阅读量
    allReadCount.value = Number(res.video_total || 0);
    readBuyList.value = res.list;
    // console.log(readBuyList);
  }
};

// 2.emit
const onHw = (e) => {
  // console.log(e);
};
// 3：触发子组件expose外抛得方法
let hwEL = ref<Element>();
const tapHwExposeFn = () => {
  // console.log(hwEL.value.exposeHwFn());
};
const getUserInfos = async () => {
  const res = await getUserInfo();
  // console.log(res);
};
// 4：使用toRef 只会影响原数据，并不会对ui界面造成影响因为原数据是非响应式的数据
let bqcObj = {
  name: 'bqc',
  age: 123,
  gender: 'man',
};
let name = toRef(bqcObj, 'name');
console.log(name);
const changeToRefsVal = () => {
  const count = Math.random();
  name.value = name.value + count;
  console.log(name.value);
  console.log(bqcObj);
};
// 5：toRaw
const val = ['a', 'b', 'c'];
let testRawArr = ref<string[]>(val);
let test2RawArr = toRaw(testRawArr);
// test2RawArr = ['d'];
console.log(test2RawArr);
console.log(toRaw(testRawArr.value[2]));
</script>

<style lang="scss">
.title {
  position: relative;
  width: 200px;
  height: 100px;
  font-size: 12px;
  line-height: 50px;
  text-align: center;
}

.swiper-slide {
  img {
    width: 100%;
    height: 100px;
  }
}

.moiveList {
  padding: 0 20px;
  margin-top: 15px;

  .moiveTab {
    display: flex;
    width: 335px;
    height: 105px;
    margin-top: 5px;
    border: 1px solid #f3f3f3;

    &.firstTba {
      margin-top: 0;
    }

    .coverImg {
      width: 160px;
      overflow: hidden;
      // max-width: 160px;
      // height: 105px;
    }

    .introsBox {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 13px 15px 14px 14px;

      .contrlbox {
        display: flex;
        align-items: center;
      }

      .moiveDate {
        margin-bottom: 6px;
        font-size: 10px;
        color: #999;
      }

      .moiveIntros {
        min-width: 141px;
        height: 36px;
        margin-bottom: 6px;
        overflow-y: hidden;
        font-size: 13px;
        font-weight: bold;
        color: #000;
      }

      .bannelBox {
        display: flex;
        justify-content: flex-end;

        .bannel {
          display: flex;
          width: 120px;

          .contrlbox {
            justify-content: flex-start;
            width: 60px;
            text-align: left;

            .zan {
              width: 16px;
              height: 16px;
              margin-left: 7px;
            }

            .look {
              width: 16px;
              height: 16px;
            }

            .count {
              margin-top: 2px;
              margin-left: 4px;
              font-size: 10px;
              line-height: 12px;
              color: #999;
            }
          }

          &.isJqr {
            width: 50px;
          }
        }
      }
    }
  }
}
</style>
