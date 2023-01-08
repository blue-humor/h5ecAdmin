import request from '@/utils/request';

export async function reqDetaleArticle(data: any, options?: any): Promise<any> {
    return request('/v1/pc/deleteArticle', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}
export async function reqAddArticle(data: any, options?: any): Promise<any> {
    return request('/v1/pc/addArticle', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}
export async function reqUpdateArticle(data: any, options?: any): Promise<any> {
    return request('/v1/pc/updateArticle', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}

export async function reqTableList(data: any, options?: any): Promise<any> {
    return request('/v1/pc/getArticleList', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}


export async function reqPublishArticle(data: any, options?: any): Promise<any> {
    return request('/v1/pc/publishArticle', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}
