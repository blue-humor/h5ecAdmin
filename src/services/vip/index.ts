import request from '@/utils/request';

export async function reqTableList(data: any, options?: any): Promise<any> {
  return request('/v1/pc/getMemberList', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
///v1/updateAboutus

export async function reqAboutUpdate(data: any, options?: any): Promise<any> {
  return request('/v1/updateAboutus', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
export async function reqAbout(data: any, options?: any): Promise<any> {
  return request('/v1/aboutus', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
