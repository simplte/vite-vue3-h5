#### 虚拟列表一直展示不出来的原因

```
1: 因为 wrapper 一直没有高度  所以在 refreshView 中一直获取不到 clientHeight(元素高度)
也获取不到scrollTop  元素滚动距离顶部的高度

因此没办法计算出列表需要展示的数据  所以获取到的 listViewWithInfo 一直是空数组 所以页面数据展示不出来
```

#### 具名插槽传值

```
1: 定义的属性以: 开头  类似小程序中  通过 data-xxx 定义的方式
<slot :item="d.item" :height="d.height" :offset="d.offset" :index="d.index"></slot>

2: 使用的地方通过 template 标签 通过 #default="scope" 定义插槽返回的数据
 <template #default="scope">
  <div class="item">
    <div v-if="scope.item.no === 1">
      代码中是有2000条的数据的，但是我们在渲染的时候刚好满足可视窗口高度的列表，因为代码中为了显示特别一点，还特意加了一个独特的高度的，所以在滚动的时候无法精确到每次都有一定的条数。`item-height-getter`可以通过这个来添加个别`Item`特别的高度。`default-item-height`这个可以设置item默认的高度，在没有设置`item-height-getter`情况下，就可以固定每次显示多少条，因为高度都是一样的，可视窗口就那么宽。有兴趣的朋友可以自己去试一下，这里就不做展示了。
    </div>
    <div v-else :style="{ color: scope.item.color }">
      NO: {{ scope.item.no }}, height: {{ scope.height }}px, offset: {{ scope.offset }}px
    </div>
  </div>
</template>
```
