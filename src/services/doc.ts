import request from '@/utils/request';

const commonPrefix = '/api/01bot/server/v1';
const commonPrefixV2 = '/api/01bot/server/v2';

interface AddDocGroupQuery {
    name: string; // 组名
}


interface RegisterDocParams {
    group_id: string; // 组ID
}

interface RegisterDocQuery {
    docs: RegisterDocItem[];
}
interface RegisterDocItem {
    object_name: string; // 对象名，字符串，需要分级管理，比如a/b/c.pdf
    file_name: string; // 文件名
    ref: string; // 文档url
}

// 获取卡片
export interface GetCenterCardListData {
    id?: string; // ID
    title?: string; // 标题
    guide?: string; // 提示问题
    template: string; // 对话模板
    extend?: string;
    scene?: number; // 场景
    priority?: number; // 优先级
    biz_code?: number; // 业务码
    is_deleted?: boolean; // 是否删除
}

// 上传文档
interface PostUploadParams {
    files: File;
    dirName: string;
    contentType: string;
}

// 下载文档
interface GetDownloadParams {
    path: string;
}

// 获取所有会话
interface GetSessionListQuery {
    scene: number; // 场景，0：文档理解，1：病历理解（病历生成），2：医疗问答，3：病历问答
    page?: number; // 页码
    page_size?: number; // 每页大小
}

// 获取所有会话
export interface GetSessionListData {
    session_id: string; // 会话ID
    title: string; // 会话标题
    docs: GetSessionListDocItem[]; // 关联的文档（仅文档理解使用）
    create_time: string; // 创建时间
    update_time: string; // 修改时间
    doc_ids: string[]; // 关联的文档理解文档ID以及病历问答的病历id
}

export interface GetSessionListDocItem {
    id: string; // 文档ID
    file_name: string; // 文档名称
    scene: number; // 场景，0：文档理解，1：病历生成，2：医疗问答，3：病历问答
}

export interface ISource {
    source_id?: string;
    source_score?: string;
    source_type?: string;
    file_id: string;
    file_page: number;
    file_content?: string;
    file_content_zh: string;
    file_name: string;
}

export interface ChatMindQuery {
    messages: Object[],
}

export type MesType = 'text' | 'markdown' | 'image' | 'file' | 'video' | 'voice' | 'cdss-emr' | 'cdss-result';


export interface Content {
    type?: MesType;
    body?: string;
    url?: string;
    file_id?: string;
    file_name?: string;
    file_type?: string;
    method?: string;
    emr?: any;
}

interface GetChatHistoryParams {
    /**
     * 前端生成的sessionid
     */
    session_id: string;
}



// 获取卡片
interface GetCenterCardListQuery {
    scene: number; // 场景，0：文档理解，1：病历理解，2：医疗问答
    page_size: number; // 卡片数量，-1表示全部
    page: number; // 页码
    biz_code: number; // 业务code
}

interface Question {
    attach: string;
    /**
     * 问题内容
     */
    query: string;
}



interface Answer {
    /**
     * 回答内容
     */
    answer: string;
    message_id: string;
    /**
     * 0：无意见，1：赞，2：踩
     */
    rating: number;
    error_code: number;
    message_group_id: string;
}

interface GetChatHistoryData {
    answer: Answer[];
    create_time: string;
    message_id: string;
    /**
     * 问题信息
     */
    question: Question;
    /**
     * 0：无意见，1：赞，2：踩
     */
    rating: number;
    session_id: string;
    update_time: string;
}

interface CreateChatParams {
    title?: string;
    /**
     * 文档理解场景下，会话关联的文档
     */
    doc_ids?: string[];
    /**
     * 场景，0：文档理解，1：病历理解，2：医疗问答
     */
    scene: number;
}

// 获取bos配置信息
export interface GetBOSConfigData {
    host: string;
    sts_host: string;
    bucket_name: string;
    sts_ak: string;
    sts_sk: string;
    sts_token: string;
}

export interface AskParams {
    model?: 'medical-doc-v1' | 'medical-record-gen-v1' | 'medical-record-qa-v1' | 'medical-qa-v1'; // 文档理解、病历理解、医疗问答
    user_id?: number; // 用户ID
    session_id?: string; // 当前多轮对话-会话ID，ID由后端生成，为空或者字段不存在代表新会话
    question_id?: string; // 问题ID
    messages: [
        {
            message_id?: string; // 用户提问的问题ID，用于聚合同一个问题多次生成的不同答案，新问题的question_id由01bot-server生成，已有问题重新生成由前端指定question_id
            created?: number; // 消息创建时间戳(秒)
            role: any; // user: 用户
            content: Content[]; // 参考基础规范定义中content字段
            default?: number;
            llm_service?: string; // // 底座默认大模型，ernie-bot为一言，pc-mind为脑海（默认为脑海）
        }
    ];
}

export interface QaAnswer {
    error_code: number; // 错误码
    error_msg: string; // 错误信息
    logid: number; // logid，由SSE-Gateway生成
    client_id: string;
    result: Array<{
        session_id: string; // 当前多轮对话-会话ID，由01Bot-Server生成
        question_id: string;
        created: number; // 会话创建时间戳
        messages: [
            {
                created: number; // 消息创建时间戳
                message_id: string; // 用户提问的问题ID，用于聚合同一个问题多次生成的不同答案
                role: 'user' | 'assistant' | 'system'; // user: 用户，assistant: AI大模型, system: 系统提示（比如上传文档后，系统提示当前文档可提问的示例问题）
                content: Content[];
                source: ISource[];
                status: number;
                recommend_questions: string[];
                candidate_questions: string[];
            }
        ];
    }>;
}




interface GetObjectURLQuery {
    object_name: string;
}

interface EditMesContentParams {
    session_id: string;
    message_id: string;
    current_answer: string;
}




/**
 * 新建文档分组
 * @param data
 * @returns
 */
export const addDocGroupApi = async (query: AddDocGroupQuery) => {
    return await request.post(`${commonPrefix}/doc-manager/group`, {
        data: query
    });
};

/**
 * 修改文档分组
 * @param data
 * @param group_id
 * @returns
 */
export const editDocGroupApi = async (group_id: string, data: any) => {
    return await request.put(`${commonPrefix}/doc-manager/group/${group_id}`, {
        data
    });
};

/**
 * 删除文档分组
 * @param data
 * @param group_id
 * @returns
 */
export const deleteDocGroupApi = async (group_id: string) => {
    return await request.delete(`${commonPrefix}/doc-manager/group/${group_id}`);
};

/**
 * 获取所有分组
 * @returns
 */
export const getDocGroupApi = async (params: any) => {
    return await request.get(`${commonPrefixV2}/doc-manager/group`, {
        params
    });
};

/**
 * 注册文档
 * @param group_id
 * @param data
 * @returns
 */
export const registerDocApi = async (params: RegisterDocParams, query: RegisterDocQuery) => {
    return await request.post(`${commonPrefix}/doc-manager/group/${params.group_id}/doc`, {
        data: query
    });
};

/**
 * 编辑文档
 * @param group_id
 * @param data
 * @returns
 */
export const editDocApi = async (group_id: string, doc_id: string, data: any) => {
    return await request.put(`${commonPrefix}/doc-manager/group/${group_id}/doc/${doc_id}`, {
        data
    });
};

/**
 * 删除文档
 * @param group_id
 * @param doc_id
 * @returns
 */
export const deleteDocApi = async (group_id: string, doc_id: string) => {
    return await request.delete(`${commonPrefix}/doc-manager/group/${group_id}/doc/${doc_id}`);
};

/**
 * 解析文档
 * @param data
 * @returns
 */
export const interpretDocApi = async (data: any) => {
    return await request.post(`${commonPrefixV2}/doc-manager/interpret`, {
        data
    });
};

/**
 * 批量获取文档信息
 * @param data
 * @returns
 */
export const postDocApi = async (data: any) => {
    return await request.post(`${commonPrefix}/doc-manager/doc`, {
        data
    });
};

// 获取首页卡片
export const getHomeCardListApi = async (query: any): Promise<GetCenterCardListData> => {
    return await request.get(`${commonPrefix}/home/bianque/card`, {
        params: query
    });
};

/**
 * 新建会话
 * @param data
 * @returns
 */
export const createChatApi = async (data: CreateChatParams) => {
    return await request.post(`${commonPrefix}/aichat/session`, {
        data
    });
};

/**
 * 获取某个会话的所有消息
 * @param session_id
 * @returns
 */
export const getChatHistoryApi = async (params: GetChatHistoryParams) => {
    return await request.get<GetChatHistoryData>(`${commonPrefix}/aichat/session/${params.session_id}/message`);
};



// 上传文件接口
export const uploadApi = async (data: PostUploadParams, onPregress?: (progressEvent: any) => void) => {
    return await request.post(
        `${commonPrefix}/storage/upload-file`,
        {
            data,
            onUploadProgress: onPregress,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
};

// 下载文件接口
export const downloadApi = async (data: GetDownloadParams, onPregress?: (progressEvent: any) => void) => {
    return await request.get(`${data?.path}`, {
        onDownloadProgress: onPregress,
        responseType: 'blob'
    });
};

// 获取所有会话
export const getSessionListApi = async (query: GetSessionListQuery) => {
    return await request.get(`${commonPrefixV2}/aichat/session`, {
        params: query
    });
};

// 删除单个会话
export const deleteSessionApi = async (session_id: string) => {
    return await request.delete(`${commonPrefix}/aichat/session/${session_id}`);
};


// 删除所有会话
export const deleteAllSessionApi = async (data: any) => {
    return await request.delete(`${commonPrefix}/aichat/session`, {
        data
    });
};


/**
 * 编辑会话
 * @param session_id
 * @param data
 * @returns
 */
export const editSessionApi = async (session_id: string, data: any) => {
    return await request.put(`${commonPrefix}/aichat/session/${session_id}`, {
        data
    });
};

/**
 * 修改单据分组
 * @param group_id
 * @returns
 */
export const editMedicalRecordGroupApi = async (group_id: string, data: any) => {
    return await request.put(`${commonPrefix}/record-manager/group/${group_id}`, {
        data
    });
};




/**
 * 赞或踩
 * @param data
 * @returns
 */
export const postMessageFeedbackApi = async (data: any) => {
    return await request.post(`${commonPrefix}/aichat/session/message_feedback`, {
        data
    });
};


// 获取卡片：换一换
export const getCenterCardListApi = async (query: GetCenterCardListQuery): Promise<GetCenterCardListData> => {
    return await request.get(`${commonPrefixV2}/home/card`, {
        params: query
    });
};


// 获取bos配置信息
export const getBOSConfigApi = async (): Promise<GetBOSConfigData> => {
    return await request.get(`${commonPrefix}/storage/bos/sts`);
};



// 获取上传object对应的URL
export const getObjectURL = async (query: GetObjectURLQuery) => {
    return await request.post(`${commonPrefix}/storage/bos/object/url`, {
        data: query
    });
};


/**
 * 停止生成问题
 * @param data
 * @returns
 */
export const editMesContentApi = async (data: EditMesContentParams) => {
    return await request.post(`${commonPrefix}/aichat/conversation/end`, {
        data
    });
};


export const queryChatMindAnswer = async (params: ChatMindQuery) => {
    return await request.post("/qa_api/api_chat", {
        data: params,
    })
}

