import request from '@/utils/request';

export async function reqUploadFile(data: any, options?: any): Promise<any> {
    return request('/v1/uploadFile', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}

export async function reqTableList(data: any, options?: any): Promise<any> {
    return request('/v1/pc/registerList', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}
