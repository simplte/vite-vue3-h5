### 全局 vue 执行

1. 图片懒加载指令

```
通常一个 Vue3 的插件会暴露 install 函数，当 app 实例 use 该插件时，就会执行该函数。在 install 函数内部，通过 app.directive 去注册一个全局指令，这样就可以在组件中使用它们了。
```
