import { resolve } from 'path';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';

import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugins/index';
import { createProxy } from './build/vite/proxy';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const isBuild = command === 'build';
  const { VITE_PORT: port = 3000, VITE_PUBLIC_PATH: base = './', VITE_PROXY } = viteEnv;
  const proxy = createProxy(VITE_PROXY);
  return {
    plugins: createVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@@': resolve(__dirname, 'src/assets/images'),
      },
    },
    // 定义全局常量替换方式
    define: {
      'process.env.APP_IS_LOCAL': '"true"',
      qcccc: 'true',
    },
    // 开发或生产环境服务的公共基础路径
    base,
    server: {
      host: true,
      https: false,
      port,
      proxy,
    },
  };
});
