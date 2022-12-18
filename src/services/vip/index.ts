import request from '@/utils/request';

export async function reqTableList(data: any, options?: any): Promise<any> {
  return request('/v1/pc/getMemberList', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}