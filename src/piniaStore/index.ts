import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

// 定义并导出容器，第一个参数是容器id，必须唯一，用来将所有的容器
// 挂载到根容器上
export const useFirstStore = defineStore('myStore', {
  // 定义state，用来存储状态的
  state: () => {
    return {
      count: 0,
      arr: [1, 2, 3],
    };
  },
  // 定义getters，类似于computed，具有缓存g功能
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  // 定义actions，类似于methods，用来修改state，做一些业务逻辑
  actions: {
    changeCount(v) {
      this.count = v;
    },
  },
});
type UserInfo = {
  userName: string;
  realName: string;
  headImg: string;
  organizationFullName: string;
};
export const useUserStore = defineStore('user', () => {
  const userInfo = reactive<UserInfo>({
    userName: '',
    realName: '',
    headImg: '',
    organizationFullName: '',
  });
  const fullName = computed(() => {
    return `${userInfo.userName}[${userInfo.realName}]`;
  });
  const setUserInfo = (info: UserInfo) => {
    Object.assign(userInfo, { ...info });
  };
  return {
    userInfo,
    fullName,
    setUserInfo,
  };
});
