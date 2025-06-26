
import request from '@/utils/request';
/**
 * ocr 解析图片
 * @returns
 */
export const requestOcrParseImage = async (data: any): Promise<any> => {
    return await request.post('/ihcloud/api/v1/mdocai/ocr', { data });
};
