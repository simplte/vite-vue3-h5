import { defineAsyncComponent } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

// 配置项
interface Options {
  delay?: number; // 延迟时间
  timeout?: number; // 超时时间
  loading?: boolean; // 是否正在加载
  retry?: boolean; // 重试方法
}

/**
 * 加载组件错误处理方法
 * @param error 错误信息对象
 * @param retry 当是reject态时异步组件是否应该重试，最多执行 3 次
 * @param fail 类似promise的状态：resolve/reject，必须调用其中一个才能继续进行错误处理。
 * @param attempts 最大的重试次数
 */
function loadErrorHandler(error: Error, retry: () => void, fail: () => void, attempts: number) {
  if (error.message.match(/fetch/) && attempts <= 3) {
    retry();
  } else {
    fail();
  }
}

/**
 * 创建异步组件，支持重试机制
 * @param loader 异步加载组件方法
 * @param options 额外配置项
 */
export function createAsyncComponent(loader: Fn, options: Options = {}) {
  const { delay = 100, timeout = 30000, retry = true } = options;
  return defineAsyncComponent({
    loader,
    // 定义组件不受 Suspense 控制，自定义组件的加载状态下使用
    suspensible: false,
    timeout,
    delay,
    onError: !retry ? noop : loadErrorHandler,
  });
}
