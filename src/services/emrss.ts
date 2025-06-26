import request from '@/utils/request';

// 获取模型列表
export const getModelOptionsApi = async (params: any) => {
    return await request.get('/pcl-webserver/api/v2/ai-manager/model/service/list', {
        params
    });
};

// 模型服务代理
export const modelServiceProxyApi = async (url: string, params: any) => {
    return await request.post(url, {data: params});
};
