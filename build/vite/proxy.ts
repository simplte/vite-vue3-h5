/**
 * Used to parse the .env.development proxy configuration
 */
 import type { ProxyOptions } from 'vite';

 type ProxyItem = [string, string];
 
 type ProxyList = ProxyItem[];
 
 type ProxyTargetList = Record<string, ProxyOptions & { rewrite?: (path: string) => string }>;
 
 const httpsRE = /^https:\/\//;
 
 /**
  * 生成代理
  * @param list
  */
 export function createProxy(list: ProxyList = []) {
   const ret: ProxyTargetList = {};
   for (const [prefix, target, shouldRewrite = false] of list) {
     const isHttps: boolean = httpsRE.test(target);
     // https://github.com/http-party/node-http-proxy#options
     ret[prefix] = {
       target,
       changeOrigin: true,
       // ws: true,
       // rewrite: path => path.replace(new RegExp(`^${prefix}`), prefix),
       // https is require secure=false
       ...(isHttps ? { secure: false } : {}),
     };
     if (shouldRewrite) ret[prefix].rewrite = path => path.replace(new RegExp(`^${prefix}`), '');
   }
   console.log(ret);
   return ret;
 }
 