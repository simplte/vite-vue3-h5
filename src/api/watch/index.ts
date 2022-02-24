import http from '@/utils/http/index';

enum WatchAPI {
  getList = '/api/v1/getList',
}

/**
 * 边看边买数据
 */
export async function getList(): Promise<any> {
  return http.get({
    url: WatchAPI.getList,
  });
}
