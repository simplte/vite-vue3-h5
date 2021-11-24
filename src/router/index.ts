import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { DemoRoutes } from './modules/demo';
import { AppRouteRecordRaw } from './types';

const routeList: Array<AppRouteRecordRaw> = [...DemoRoutes];

// eslint-disable-next-line @typescript-eslint/naming-convention
const router = createRouter({
  history: createWebHistory(),
  routes: routeList as unknown as RouteRecordRaw[],
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
