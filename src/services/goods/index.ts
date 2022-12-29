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

export async function reqInfo(data: any, options?: any): Promise<any> {
  return request('/v1/pc/getGoodsById', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function reqDelete(data: any, options?: any): Promise<any> {
  return request('/v1/pc/deleteGoods', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
export async function reqEdit(data: any, options?: any): Promise<any> {
  return request('/v1/pc/editGoods', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
