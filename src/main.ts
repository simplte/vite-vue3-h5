import './utils/rem';
import './assets/less/base.less';

import { createApp } from 'vue';

import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from './store';

const app = createApp(App);
(window as any).global = window;

function bootstrap(app) {
  setupRouter(app);
  setupStore(app);
  router.isReady().then(() => app.mount('#app', true));
}

void bootstrap(app);
