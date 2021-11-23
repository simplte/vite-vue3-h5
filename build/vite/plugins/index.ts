import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { Plugin } from 'vite'

import { configMockPlugin } from './mock';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // 必须
    vue(),
    // 必须
    vueJsx(),
    configMockPlugin(isBuild)
  ]
  return vitePlugins;
}