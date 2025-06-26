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
    id?: string;
    parent_id: string;
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

// 获取所有会话
interface GetSessionListData {
    session_id: string; // 会话ID
    title: string; // 会话标题
    docs: GetSessionListDocItem[]; // 关联的文档（仅文档理解使用）
    create_time: string; // 创建时间
    update_time: string; // 修改时间
    doc_ids: string[]; // 关联的文档理解文档ID以及病历问答的病历id
}

interface GetSessionListDocItem {
    id: string; // 文档ID
    file_name: string; // 文档名称
    scene: number; // 场景，0：文档理解，1：病历生成，2：医疗问答，3：病历问答
}

interface ISource {
    source_id?: string;
    source_score?: string;
    source_type?: string;
    file_id: string;
    file_page: number;
    file_content?: string;
    file_content_zh: string;
    file_name: string;
}

interface QaAnswer {
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
