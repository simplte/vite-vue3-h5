import './utils/rem';
import './assets/less/base.less';
import 'vant/lib/index.css';
// Register icon sprite
import 'virtual:svg-icons-register';

import { createApp } from 'vue';

import App from './App.vue';
import { setupDirectives } from './directives';
import { setupVantComp } from './plugins';
import router, { setupRouter } from './router';
import { setupStore } from './store';
const app = createApp(App);
(window as any).global = window;

function bootstrap(app) {
  setupDirectives(app);
  setupVantComp(app);
  setupRouter(app);
  setupStore(app);
  router.isReady().then(() => app.mount('#app', true));
}

void bootstrap(app);
