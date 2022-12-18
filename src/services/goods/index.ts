import request from '@/utils/request';

export async function reqTableList(data: any, options?: any): Promise<any> {
  return request('/v1/pc/getGoodsList', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function reqAddGoods(data: any, options?: any): Promise<any> {
  return request('/v1/pc/addGoods', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
