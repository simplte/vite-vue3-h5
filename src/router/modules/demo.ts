import BasicLayout from '@/layout/BasicLayout.vue';
import { createAsyncComponent } from '@/utils/tools/createAsyncComponent';

import { AppRouteRecordRaw } from '../types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DemoRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../../views/index/index.vue'),
  },
  {
    path: '/sdkPage',
    name: 'sdkPage',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../../views/sdk/index.vue'),
  },
  {
    path: '/webSocket',
    name: 'webSocket',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../../views/webSocket/index.vue'),
  },
  {
    path: '/animation',
    name: 'animation',
    component: () => import('../../views/animation/index.vue'),
  },
];
