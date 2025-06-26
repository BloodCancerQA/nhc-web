import request from '@/utils/request';


interface MedicalDetectionMappingQuery {
    disease: string;
    sym: string;
    search_title_field: string;
}

export interface RelationEntry {
    disease: string;
    inspect: string;
    predict_label: number;
    probablity: number;
    method: string;
    context: Array<Array<string | number>>;
}

// 响应参数类型
interface MedicalDetectionMappingData {
    result: RelationEntry[];
}

export async function getMedicalDetectionMapping(data: MedicalDetectionMappingQuery) {
    return request.post<MedicalDetectionMappingData>('/medical_detection_mapping', { data, hideError: true });
}