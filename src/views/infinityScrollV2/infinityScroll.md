#### 虚拟列表 vue2 版本

```
<template>
  <div class="m-container">
    <div class="m-header">我是头部</div>
    <div class="m-list">
      <div class="m-list-container">
        <Select
          ref="list-view"
          :list="list"
          :item-height-getter="itemHeightGetter"
          :default-item-height="defaultItemHeight"
          @scroll="listScroll"
        >
          <div slot-scope="scope" class="item">
            <div v-if="scope.item.no === 1">
              代码中是有2000条的数据的，但是我们在渲染的时候刚好满足可视窗口高度的列表，因为代码中为了显示特别一点，还特意加了一个独特的高度的，所以在滚动的时候无法精确到每次都有一定的条数。`item-height-getter`可以通过这个来添加个别`Item`特别的高度。`default-item-height`这个可以设置item默认的高度，在没有设置`item-height-getter`情况下，就可以固定每次显示多少条，因为高度都是一样的，可视窗口就那么宽。有兴趣的朋友可以自己去试一下，这里就不做展示了。
            </div>
            <div v-else :style="{ color: scope.item.color }">
              NO: {{ scope.item.no }}, height: {{ scope.height }}px, offset: {{ scope.offset }}px
            </div>
          </div>
        </Select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Select from './components/select-v2.vue';

export default {
  name: 'Customized',

  components: {
    Select,
  },

  data() {
    return {
      list: [],
      page: 0,
      itemHeightGetter(item) {
        if (item.no % 33 === 0) {
          return 27;
        }
        return 20 + (item.no % 10);
      },
      defaultItemHeight: 30,
    };
  },

  created() {
    this.getData().then((d) => {
      this.list = d;
    });
  },
  mounted() {},

  methods: {
    listScroll(data) {
      if (!this._getting && data.bottomItemIndex >= this.list.length - 3) {
        this._getting = true;
        this.getData().then((d) => {
          this.list.push(...d);
          this.page++;
          this._getting = false;
        });
      }
    },
    getData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const baseIndex = this.page * 2000;
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
    },
  },
};
</script>

<style lang="less" scoped>
.m-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .m-header {
    height: 40px;
    background: greenyellow;
  }
  .m-list {
    flex: 1;
    position: relative;
    .m-list-container {
      position: absolute;
      width: 100%;
      height: 100%;
      .item {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

```

### 组件实现

```

<template>
  <div
    ref="wrapper"
    style="width: 100%; height: 100%; overflow: auto; position: relative; margin: 0; padding: 0; border: none;"
        "
    @scroll="refreshView()"
  >
    <div
      :style="{ height: listTotalHeight + 'px' }"
      style="width: 100%; padding: 0; margin: 0"
    ></div>
    <div
      ref="item-wrapper"
      style="position: absolute; top: 0; left: 0; width: 100%; padding: 0; margin: 0"
    >
      <div v-for="d in listViewWithInfo" :key="d.index" :style="{ 'min-height': d.height + 'px' }">
        <slot :item="d.item" :height="d.height" :offset="d.offset" :index="d.index"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: Array, // 列表数据
    itemHeightGetter: Function, // 获取列表高度的函数
    defaultItemHeight: Number, // 默认item高度
  },
  data() {
    return {
      listView: [], // 可视列表数据
      listTotalHeight: 0, // 列表总高度
      itemOffsetCache: [], // item信息缓存
      topItemIndex: 0, // 可视窗口的第一项
    };
  },
  computed: {
    listViewWithInfo() {
      // 封装listView，提供index、height、offset数据
      return this.listView.map((item, viewIndex) => {
        const index = this.topItemIndex + viewIndex;
        const { height, offset } = this.getItemInfo(index);
        return {
          index,
          item,
          height,
          offset,
        };
      });
    },
  },
  watch: {
    list() {
      this.refreshView();
    },
  },
  mounted() {
    this.refreshView({ resize: true });
  },
  methods: {
    // 重渲染可视列表（可供组件外部调用）
    refreshView(config) {
      if (config) {
        if (config.resize) {
          // 只有resize为true时对wrapper高度重新取值，减少DOM取值操作
          console.log(this.$refs.wrapper);
          this._viewHeight = this.$refs.wrapper.clientHeight;
        }
        if (config.clearCache) {
          // 清空缓存
          this.itemOffsetCache = [];
        }
      }
      const scrollTop = this.$refs.wrapper.scrollTop; // 当前scrollTop
      const viewHeight = this._viewHeight; // 可视窗口高度
      const topItemIndex = this.findItemIndexByOffset(scrollTop); // 可视窗口的第一项
      const bottomItemIndex = this.findItemIndexByOffset(scrollTop + viewHeight); // 可视窗口的最后项
      this.topItemIndex = topItemIndex;
      this.listView = this.list.slice(topItemIndex, bottomItemIndex + 1); // 可视列表

      // 列表总高度
      // 若提供了默认item高度（defaultItemHeight），则高度 = 已计算item的高度总合 + 未计算item数 * 默认item高度；否则全部使用计算高度
      // 这里已计算过的item会缓存，所有item只会计算一次
      const listTotalHeight = this.defaultItemHeight
        ? this.getItemInfo(this.itemOffsetCache.length - 1).offset +
          (this.list.length - this.itemOffsetCache.length) * this.defaultItemHeight
        : this.getItemInfo(this.list.length - 1).offset;

      this.listTotalHeight = listTotalHeight;
      console.log(listTotalHeight);

      this.$refs['item-wrapper'].style.transform = `translateY(${
        this.getItemInfo(topItemIndex - 1).offset
      }px)`; // 控制translateY使可视列表位置保持在可视窗口

      // 对外抛出scroll事件
      this.$emit('scroll', {
        topItemIndex,
        bottomItemIndex,
        listTotalHeight,
        scrollTop,
      });
    },
    // 根据offset获取item的在列表中的index
    findItemIndexByOffset(offset) {
      // 如果offset大于缓存数组的最后项，按序依次往后查找（调用getItemInfo的过程也会缓存数组）
      if (offset >= this.getItemInfo(this.itemOffsetCache.length - 1).offset) {
        for (let index = this.itemOffsetCache.length; index < this.list.length; index++) {
          if (this.getItemInfo(index).offset > offset) {
            return index;
          }
        }
        return this.list.length - 1;
      } else {
        // 如果offset小于缓存数组的最后项，那么在缓存数组中二分法查找
        let begin = 0;
        let end = this.itemOffsetCache.length - 1;
        while (begin < end) {
          let mid = ((begin + end) / 2) | 0;
          let midOffset = this.getItemInfo(mid).offset;
          if (midOffset === offset) {
            return mid;
          } else if (midOffset > offset) {
            end = mid - 1;
          } else {
            begin = mid + 1;
          }
        }
        if (
          this.getItemInfo(begin).offset < offset &&
          this.getItemInfo(begin + 1).offset > offset
        ) {
          begin = begin + 1;
        }
        return begin;
      }
    },
    // 获取item信息（有缓存则取缓存，无缓存则计算并缓存）
    getItemInfo(index) {
      // 超出取值范围，返回默认值
      if (index < 0 || index > this.list.length - 1) {
        return {
          offset: 0,
          height: 0,
        };
      }
      let cache = this.itemOffsetCache[index];
      // 如果没有缓存，进行计算并缓存结果
      if (!cache) {
        // 优先用itemHeightGetter计算高度，无itemHeightGetter则取defaultItemHeight作为高度
        let height = this.itemHeightGetter
          ? this.itemHeightGetter(this.list[index], index)
          : this.defaultItemHeight;
        cache = this.itemOffsetCache[index] = {
          height, // item高度
          offset: this.getItemInfo(index - 1).offset + height, // 递归得出item的bottom距离列表顶部的距离，item的offset = 上个item的offset + 自己的height
        };
      }
      // 如果已有缓存，直接返回缓存的结果
      return cache;
    },
  },
};
</script>

```
