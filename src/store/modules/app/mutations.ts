import { MutationTree } from 'vuex';

import { AppMutationTypes } from './mutation-types';
import { State } from './state';
export type Mutations<S = State> = {
  [AppMutationTypes.SET_PAGE_LOADING]: (state: S, data: boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const mutations: MutationTree<State> & Mutations = {
  [AppMutationTypes.SET_PAGE_LOADING]: (state, loading) => {
    state.pageLoading = loading;
  },
};
