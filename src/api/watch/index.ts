import http from '@/utils/http/index';
enum API {
  getList = `/_new_cms/api/watch/videoList`,
}
interface VideoList {
  page: number;
}

export async function getList(data: VideoList): Promise<any> {
  return http.post({
    url: API.getList,
    data,
  });
}
