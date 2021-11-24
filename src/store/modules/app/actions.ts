import { ActionContext, ActionTree } from 'vuex';

import { RootState } from '@/store';

import { AppActionTypes } from './action-types';
import { AppMutationTypes } from './mutation-types';
import { Mutations } from './mutations';
import { State } from './state';

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [AppActionTypes.SET_PAGE_LOADING]: (context: ActionAugments, loading: boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const actions: ActionTree<State, RootState> & Actions = {
  [AppActionTypes.SET_PAGE_LOADING]({ commit }, loading) {
    commit(AppMutationTypes.SET_PAGE_LOADING, loading);
  },
};
