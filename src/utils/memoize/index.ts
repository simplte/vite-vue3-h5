import { generateKey } from './models';
import { TargetFun } from './types';

export function memoize<T>(fn: TargetFun<T>, options) {
  const normalizer = options?.normalizer ?? generateKey;
  return new Proxy(fn, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cache: new Map<string, T>(),
    apply(target, thisArg, argsList) {
      // 获取保存的内存信息
      const currentCache = (this as any).cache;
      // 根据数据参数直接生成 Map 的 key
      const cacheKey = normalizer(argsList);
      // 当前没有被缓存，执行调用，添加缓存
      if (!currentCache.has(cacheKey)) {
        let result: any = target.apply(thisArg, argsList);
        if (result?.then) {
          result = Promise.resolve(result).catch((error) => {
            currentCache.delete(cacheKey);
            // 把错误衍生出去
            return Promise.reject(error);
          });
        }
        currentCache.set(cacheKey, result);
      }
      // 返回被缓存的数据
      return currentCache.get(cacheKey);
    },
  });
}

export class ExpiredCacheItem<V> {
  data: V;
  cacheTime: number;
  constructor(data: V) {
    this.data = data;
    this.cacheTime = new Date().getTime();
  }
}
