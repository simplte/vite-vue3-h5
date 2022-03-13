import { App } from 'vue';

import lazyLoadImg from './lazyLoadImg';

// 注册全局指令
export function setupDirectives(app: App<Element>) {
  app.use(lazyLoadImg, {});
}
