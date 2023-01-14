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

export async function reqDelete(data: any, options?: any): Promise<any> {
    return request('/v1/delTeam', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}

//活动相关
export async function reqActivityList(data: any, options?: any): Promise<any> {
    return request('/v1/pc/getActivityList', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}
//活动相关
export async function reqActivityAdd(data: any, options?: any): Promise<any> {
    return request('/v1/pc/addActivity', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}
//活动相关
export async function reqActivitEdit(data: any, options?: any): Promise<any> {
    return request('/v1/pc/updateActivity', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}
//活动相关
export async function reqActivitDel(data: any, options?: any): Promise<any> {
    return request('/v1/pc/delActivity', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}



