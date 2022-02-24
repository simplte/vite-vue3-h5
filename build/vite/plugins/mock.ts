import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    prodEnabled: isBuild,
    localEnabled: !isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createMockServer';
      setupProdMockServer();
    `,
  });
}
