import request from '@/utils/request';

export async function reqTableList(data: any, options?: any): Promise<any> {
  return request('/v1/pc/getPcOrderList', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function reqUpdateOrderStatus(data: any, options?: any): Promise<any> {
  return request('/v1/pc/updateOrderStatus', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function reqOrderDetails(data: any, options?: any): Promise<any> {
  return request('/v1/pc/getOrderById', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
