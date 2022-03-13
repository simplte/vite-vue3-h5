import { App } from 'vue';
const lazyLoadImgPlugin = {
  install(app: App<Element>, options) {
    app.directive('lazy', {});
  },
};

export default lazyLoadImgPlugin;
