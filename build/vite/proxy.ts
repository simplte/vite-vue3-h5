import type { ProxyOptions } from 'vite'
type ProxyItem = [string, string];
type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions & { rewrite?: (path: string) => string }>

const httpsRE = /^https:\/\//;
export function createProxy(list: ProxyList = []) {
  console.log(list)
  const ret: ProxyTargetList = {};
  for (const [prefix, target, shouldRewrite = false] of list) {
    const isHttps: boolean = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ...(isHttps ? { source: false } : {})
    }
    if (shouldRewrite) ret[prefix].rewrite = path => path.replace(new RegExp(`^${prefix}`), '')
  }
  return ret
}