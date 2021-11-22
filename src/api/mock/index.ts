import http from '@/utils/http/index';

enum UserAPI {
  getUserInfo = '/api/v1/userInfo',
}

/**
 * 获取用户信息
 */
export async function getUserInfo(): Promise<any> {
  return http.get({
    url: UserAPI.getUserInfo,
  });
}
