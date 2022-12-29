import request from '@/utils/request';

export async function reqTableList(data: any, options?: any): Promise<any> {
    return request('/v1/getTeammember', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}
export async function reqAdd(data: any, options?: any): Promise<any> {
    return request('/v1/pc/addAnTeammember', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}
export async function reqEdit(data: any, options?: any): Promise<any> {
    return request('/v1/pc/editAnTeammember', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}
export async function reqDel(data: any, options?: any): Promise<any> {
    return request('/v1/pc/delAnTeammember', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}