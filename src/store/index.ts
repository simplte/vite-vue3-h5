import { App } from 'vue';
import { createLogger, createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { AppStore, State as AppState, store as app } from '@/store/modules/app';

export interface RootState {
  app: AppState;
}

export type Store = AppStore<Pick<RootState, 'app' & 'user' & 'permission'>>;
const isDebug = import.meta.env.VITE_NODE_ENV !== 'production';
const plugins = isDebug ? [createLogger()] : [];

// vuex 持久化插件
plugins.push(
  createPersistedState({
    storage: window.sessionStorage,
  })
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const store = createStore<RootState>({
  plugins,
  modules: {
    app,
  },
});

export function setupStore(app: App<Element>) {
  app.use(store);
}

export default store;
