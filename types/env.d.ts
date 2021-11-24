/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare interface ImportMeta {
  env: ImportMetaEnv;
}

declare interface ImportMetaEnv {
  VITE_APP_TITLE?: string;
  VITE_NODE_ENV: string;
  VITE_APP_BASE_URL: string;
  // more env variables...
}
