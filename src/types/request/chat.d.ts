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

interface GetChatHistoryParams {
    /**
     * 前端生成的sessionid
     */
    session_id: string;
}

// 获取所有会话
interface GetSessionListQuery {
    scene: number; // 场景，0：文档理解，1：病历理解（病历生成），2：医疗问答，3：病历问答
    page?: number; // 页码
    page_size?: number; // 每页大小
}

type MesType = 'text' | 'markdown' | 'image' | 'file' | 'video' | 'voice' | 'cdss-emr' | 'cdss-result';

interface Content {
    type?: MesType;
    body?: string;
    url?: string;
    file_id?: string;
    file_name?: string;
    file_type?: string;
    method?: string;
    emr?: any;
}

interface AskParams {
    model?: 'medical-doc-v1' | 'medical-record-gen-v1' | 'medical-record-qa-v1' | 'medical-qa-v1'; // 文档理解、病历理解、医疗问答
    user_id?: number; // 用户ID
    parent_id?: string; // 父问题ID，用于多轮对话
    session_id?: string; // 当前多轮对话-会话ID，ID由后端生成，为空或者字段不存在代表新会话
    question_id?: string; // 问题ID
    stream?: boolean, // 流式模式
    messages: [
        {
            message_id?: string; // 用户提问的问题ID，用于聚合同一个问题多次生成的不同答案，新问题的question_id由01bot-server生成，已有问题重新生成由前端指定question_id
            created?: number; // 消息创建时间戳(秒)
            role: user; // user: 用户
            content: Content[]; // 参考基础规范定义中content字段
            default?: number;
            llm_service?: string; // // 底座默认大模型，ernie-bot为一言，pc-mind为脑海（默认为脑海）
        }
    ];
}

interface EditMesContentParams {
    session_id: string;
    message_id: string;
    current_answer: string;
}



