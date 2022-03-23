#### 引入 svg-icon

1. 优势

```
1.iconfont不直观，每次都得去iconfont复制名称使用
2.iconfont每次增删改图标需要重新替换整个JS
3.iconfont不能按需加载，没使用到的也会一起打包，特别是UI换图标时一般不会将旧图标删除....
4.添加自定义SVG不友善，必须上传iconfont添加到一起再下载
```

2. 引入流程

```
1: npm i vite-plugin-svg-icons -D

2:
/**
 *  Vite Plugin for fast creating SVG sprites.
 * https://github.com/anncwb/vite-plugin-svg-icons
 */

import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]',
  });
  return svgIconsPlugin;
}

3: main.ts下引入
// Register icon sprite
import 'virtual:svg-icons-register';

4：vite.config.ts 下 将插件加入插件列表
5：新建svg组件
6：对应页面使用时，只需要输入src/assets/icons/svg名称
```
