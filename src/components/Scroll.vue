<template>
  <div
    ref="wrapper"
    style="
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      overflow: auto;
      border: none;
    "
    class="wrapperList"
    @scroll="refreshView()"
  >
    <div
      class="wrapperBox"
      :style="{ height: listTotalHeight + 'px' }"
      style="width: 100%; padding: 0; margin: 0"
    ></div>
    <div
      ref="itemWrapper"
      style="position: absolute; top: 0; left: 0; width: 100%; padding: 0; margin: 0"
    >
      <div
        v-for="d in listViewWithInfo"
        :key="d.index"
        class="slotBox"
        :style="{ 'min-height': d.height + 'px' }"
      >
        <slot :item="d.item" :height="d.height" :offset="d.offset" :index="d.index"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
const props = defineProps<{
  list: Array<any>;
  itemHeightGetter: Function;
  defaultItemHeight: Number;
}>();
const emits = defineEmits(['scroll']);
let listView = ref<any[]>([]);
let listTotalHeight = ref<number>(0);
let itemOffsetCache = ref<any[]>([]);
let topItemIndex = ref<number>(0);
let _viewHeight: number | undefined = undefined;
let wrapper = ref<HTMLElement>();
let itemWrapper = ref<HTMLElement>();
let listViewWithInfo = computed(() => {
  const value = listView.value.map((item, viewIndex) => {
    const index = topItemIndex.value + viewIndex;
    const { height, offset } = getItemInfo(index);
    return {
      index,
      height,
      item,
      offset,
    };
  });
  return value;
});
watch(
  () => {
    return props.list;
  },
  () => {
    refreshView();
  }
);
onMounted(() => {
  refreshView({ resize: true });
});
const getItemInfo = (index) => {
  // 超出取值范围，返回默认值
  if (index < 0 || index > props.list.length - 1) {
    return {
      offset: 0,
      height: 0,
    };
  }
  let cache = itemOffsetCache.value[index];
  // 如果没有缓存，进行计算并缓存结果
  if (!cache) {
    // 优先用itemHeightGetter计算高度，无itemHeightGetter则取defaultItemHeight作为高度
    let height = props.itemHeightGetter
      ? props.itemHeightGetter(props.list[index], index)
      : props.defaultItemHeight;
    cache = itemOffsetCache.value[index] = {
      height, // item高度
      offset: getItemInfo(index - 1).offset + height, // 递归得出item的bottom距离列表顶部的距离，item的offset = 上个item的offset + 自己的height
    };
  }
  // 如果已有缓存，直接返回缓存的结果
  return cache;
};
const refreshView = (config?) => {
  if (config) {
    if (config?.resize) {
      _viewHeight = wrapper.value?.clientHeight;
    }
    if (config?.clearCache) {
      itemOffsetCache.value = [];
    }
  }
  const scrollTop = wrapper?.value?.scrollTop as number;
  const viewHeight = _viewHeight as number;
  const _topItemIndex = findItemIndexByOffset(scrollTop);
  const bottomItemIndex = findItemIndexByOffset(scrollTop + viewHeight);
  topItemIndex.value = _topItemIndex;
  listView.value = props.list.slice(topItemIndex.value, bottomItemIndex);
  const _listTotalHeight = props.defaultItemHeight
    ? getItemInfo(itemOffsetCache.value.length - 1).offset +
      (props.list.length - itemOffsetCache.value.length) * props.defaultItemHeight
    : getItemInfo(props.list.length - 1).offset;
  listTotalHeight.value = _listTotalHeight;
  console.log(listView.value);
  itemWrapper.value.style.transform = `translateY(${getItemInfo(topItemIndex.value - 1).offset}px)`; // 控制translateY使可视列表位置保持在可视窗口 ;
  emits('scroll', {
    topItemIndex: topItemIndex.value,
    bottomItemIndex,
    listTotalHeight: listTotalHeight.value,
    scrollTop,
  });
};
const findItemIndexByOffset = (offset): number => {
  // 如果offset大于缓存数组的最后项，按序依次往后查找（调用getItemInfo的过程也会缓存数组）
  if (offset >= getItemInfo(itemOffsetCache.value.length - 1).offset) {
    for (let index = itemOffsetCache.value.length; index < props.list.length; index++) {
      if (getItemInfo(index).offset > offset) {
        return index;
      }
    }
    return props.list.length - 1;
  } else {
    // 如果offset小于缓存数组的最后项，那么在缓存数组中二分法查找
    let begin = 0;
    let end = itemOffsetCache.value.length - 1;
    while (begin < end) {
      let mid = ((begin + end) / 2) | 0;
      let midOffset = getItemInfo(mid).offset;
      if (midOffset === offset) {
        return mid;
      } else if (midOffset > offset) {
        end = mid - 1;
      } else {
        begin = mid + 1;
      }
    }
    if (getItemInfo(begin).offset < offset && getItemInfo(begin + 1).offset > offset) {
      begin = begin + 1;
    }
    return begin;
  }
};
</script>
