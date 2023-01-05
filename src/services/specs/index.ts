import request from '@/utils/request';

export async function reqSpecsList(data: any, options?: any): Promise<any> {
  return request('/shop/pc/getSpecsList', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function reqAdd(data: any, options?: any): Promise<any> {
  return request('/shop/pc/addCategory', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function reqEdit(data: any, options?: any): Promise<any> {
  return request('/shop/pc/editCategory', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function reqDel(data: any, options?: any): Promise<any> {
  return request('/shop/pc/delCategory', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
