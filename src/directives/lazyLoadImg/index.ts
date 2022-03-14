import { App } from 'vue';

import Lazy from './lazy';
const lazyLoadImgPlugin = {
  install(app: App<Element>, options) {
    const lazy = new Lazy(options);
    app.directive('lazy', {
      mounted: lazy.add.bind(lazy),
    });
  },
};

export default lazyLoadImgPlugin;
