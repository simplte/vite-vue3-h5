import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';

import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';
// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT: port = 3000, VITE_PUBLIC_PATH: base = './', VITE_PROXY } = viteEnv;

  const proxy = createProxy(VITE_PROXY);
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@/': new URL('./src/', import.meta.url).pathname,
        '@@/': new URL('./src/assets/images/', import.meta.url).pathname,
      },
    },
    base,
    server: {
      host: true,
      https: false,
      port,
      proxy,
    },
  };
});
